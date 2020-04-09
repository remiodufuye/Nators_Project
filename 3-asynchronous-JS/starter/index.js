const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file  💩!!');
      resolve(data);
    });
  });
};

const WriteFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could Not Write File 🤭!!');
      resolve('success');
    });
  });
};

const getDocPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await WriteFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random Dog Image Saved to File!!!!');
  } catch (err) {
    console.log(err);
    throw err;
  }

  return '2  ReADY 🐩';
};

(async () => {
  try {
    console.log('1 : Will Get Dog Pics !!!');
    const x = await getDocPic();
    console.log(x);
    console.log('3 : Done getting Dog Pics!!!');
  } catch (err) {
    console.log('ERROR  💥 !!! ');
  }
})();

/*
console.log('1 : Will Get Dog Pics !!!');
getDocPic()
  .then(x => {
    console.log(x);
    console.log('3 : Done getting Dog Pics!!!');
  })
  .catch(err => {
    console.log('ERROR  💥 !!! ');
  });
  */
