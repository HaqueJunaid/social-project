import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : "public_ItuekDHXjxV5QMOTAoY7byzKcHU=",
    privateKey : "private_EqstNJ+Liw8SuoCelHTLVC2hkjQ=",
    urlEndpoint : "https://ik.imagekit.io/yidafjeoa"
});

async function uploadImage(file, filename) {
    let data = await imagekit.upload({
        file: file,
        fileName: filename,
    })

    return data;
}

export default uploadImage;