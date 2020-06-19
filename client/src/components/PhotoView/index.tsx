import React, {useState} from 'react';

import {PhotoViewStyle} from './styled';

export interface PhotoViewProps {
    images:string[],
    editable: boolean
}
 
const PhotoView: React.SFC<PhotoViewProps> = ({images}) => {
    const [selectedImage, setSelectedImage] = useState("");

    return (    
        <PhotoViewStyle>
            <div className="photo-view__images">
                {images.map((img, idx) => (
                    <figure key={idx} onClick={()=>setSelectedImage(img)}>
                        <img src={img} />
                    </figure>
                ))}
            </div>
            <div className="photo-view__display" >
                {selectedImage? (
                    <figure>
                        <img src={selectedImage} />
                    </figure>
                ): null}
            </div>
        </PhotoViewStyle>
     );
}
 
export default PhotoView;