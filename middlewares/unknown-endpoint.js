const unknownEndpoint = (req, res) => {
    return res.status(404).json({ error: "Unknown endpoint" });
}

module.exports = unknownEndpoint;