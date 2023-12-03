import GLOBAL_ROUTE from "./GlobalRoute";

const convertBlobToImage = (image) => {
  const buffer = new Uint8Array(image);
  const blob = new Blob([buffer], { type: "image/jpeg" });
  const objectURL = URL.createObjectURL(blob);
  return objectURL;
};

const routeImage = (checker, image) => {
  if (!checker) {
    return `${GLOBAL_ROUTE}/assets/img/pexels-engin-akyurt-1907642.jpg`;
  }

  return convertBlobToImage(image);
};

export { convertBlobToImage, routeImage };
