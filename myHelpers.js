<div className="image-gallery">
  {media?.length ? (
    media.map((med) => (
      <div key={med._id} className="image-item">
        <h2>{med.title}</h2>
        <p>{med.description}</p>
        {med.media.length > 0 ? (
          med.media.map((item) => (
            <div key={item._id} className="media-item">
              <img
                key={item._id}
                src={`http://localhost:8834/${item.url}`}
                alt="media"
                style={{ width: 160, height: 160 }}
              />
              <button onClick={() => deleteMedia(med._id)}>Delete</button>
            </div>
          ))
        ) : (
          <>
            <img key={med._id} src={med.url} alt="fallback" />
            <button onClick={() => deleteMedia(med._id)}>Delete</button>
          </>
        )}
      </div>
    ))
  ) : (
    <p>No images lole</p>
  )}
</div>;

//formData
for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
