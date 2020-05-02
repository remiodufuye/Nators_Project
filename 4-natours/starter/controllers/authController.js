const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please Provide email and password!', 400));
  }
  // 2) Check if User exists and password is correct
  const user = await User.findOne({
    email,
  }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or Password!', 401));
  }

  // 3) If Everything is Okay send Token to Client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1.) Getting Token and Check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged In! Please log in to get access.', 401)
    );
  }
  // 2.) Verification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3.) Check if User Still Exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user with this token no longer exists!', 401)
    );
  }

  // 4.) Check if USer changed password after the Token was issued .

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed password , please login again !!',
        401
      )
    );
  }

  // Grant Access to Protected Route!!
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array e.g roles['admin','lead-guide'] so role = 'user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You Do not Have Permission to perform this action!', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1.) Get User Based on Posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address!', 404));
  }
  // 2.) Generate Random Reset Token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3.) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot Your Password ? Submmit a PATCH request with your new password and passwwordConfirm to : ${resetURL} .\n 
  If You Did not forget your password please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password Reset Token(Valid for 10 mins )',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token Sent to Email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending email, Try again later !'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get User based on the Token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  // 2. If Token has not expired and there is a new user , set the new password

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3. Update changedPasswordAt property for the user

  // 4. Log the user in , send JWT token
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
