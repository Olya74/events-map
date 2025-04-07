import Comment from '../models/commentModel.js';

const getComments= async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const addComment = async (req, res) => {
    const comment = new Comment(req.body);
    try {
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const deleteComments = async (req, res) => {
    try {
        const deletedComment = await Comment.deleteMany();
        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateCommentById = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateCommentPartById = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const likeComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        comment.likes.push(req.user.id);
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const unlikeComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        comment.likes.pull(req.user.id);
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getCommentsByEventId = async (req, res) => {
    const { eventId } = req.params;
    try {
        const comments = await Comment.find({ eventId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getCommentsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const comments = await Comment.find({ userId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}