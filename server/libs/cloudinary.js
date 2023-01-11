import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dg7xhhwrl',
  api_key: '777114116312657',
  api_secret: 'tVsNTvA5zRHqy60xA-muSL6sZzI'
});

export const updloadImage = async filePath => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: 'test'
  })
}

export const deleteImage = async id => {
  return await cloudinary.v2.uploader.destroy(id);
}
