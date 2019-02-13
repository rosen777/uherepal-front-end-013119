import React, {Component} from 'react'

import { Image } from 'cloudinary-react'


export default class ImageUpload extends Component {

    render() {
        return (
            <div>
                <Image cloudName="dld2hjhpb" publicId="sample" width="300" crop="scale"/>
           
                 </div>,
            document.getElementById('example')
        )
    }
}