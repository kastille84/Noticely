import React from 'react';

import {PhotoViewStyle} from './styled';

export interface PhotoViewProps {
    images:string[],
    editable: boolean
}
 
const PhotoView: React.SFC<PhotoViewProps> = ({images}) => {
    return (    
        <PhotoViewStyle>
            <div className="photo-view__images">
                {images.map((img, idx) => (
                    <figure key={idx}>
                        <img src={img} />
                    </figure>
                ))}
            </div>
            <div className="photo-view__display"></div>
        </PhotoViewStyle>
     );
}
 
export default PhotoView;