import multer from 'multer';
import path from 'path';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// Memory storage for Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const uploadTourImages = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

export const uploadUserPhoto = upload.single('photo');

export const uploadReviewPhotos = upload.array('photos', 5);

export const handleCloudinaryUpload = async (req, res, next) => {
  try {
    if (req.files) {
      // Handle cover image
      if (req.files.coverImage) {
        const coverImageResult = await uploadToCloudinary(
          `data:${req.files.coverImage[0].mimetype};base64,${req.files.coverImage[0].buffer.toString('base64')}`,
          'safarivista/tours'
        );
        req.body.coverImage = {
          url: coverImageResult.secure_url,
          public_id: coverImageResult.public_id
        };
      }

      // Handle multiple images
      if (req.files.images) {
        req.body.images = [];
        for (const file of req.files.images) {
          const result = await uploadToCloudinary(
            `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            'safarivista/tours'
          );
          req.body.images.push({
            url: result.secure_url,
            public_id: result.public_id,
            alt: req.body.name || 'Tour image'
          });
        }
      }
    }

    if (req.file) {
      const result = await uploadToCloudinary(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        'safarivista/users'
      );
      req.body.photo = result.secure_url;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default upload;