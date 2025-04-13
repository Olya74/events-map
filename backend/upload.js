import multer from "multer";
const storage = multer.memoryStorage(); // или diskStorage
const upload = multer({ storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  const { title, description, date, category, lat, lng } = req.body;

  const newEvent = new Event({
    title,
    description,
    date,
    category,
    location: { lat, lng },
    imageUrl: `/uploads/${req.file.originalname}`, // или сохранить в облако
    userId: req.user._id
  });

  // Сохрани файл куда нужно или в облако
  await newEvent.save();

  res.status(201).json(newEvent);
});
