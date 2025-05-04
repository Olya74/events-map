import axios from "axios";
import { useState,useEffect } from "react";
import ImageGallery from "../image-gallery/ImageGallery";
import "./eventsList.css";

function EventsList() {

  return (
    <div className="events-list">
       <ImageGallery /> 
    </div>
  );
}

export default EventsList;
