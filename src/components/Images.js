import React from 'react'

export default props => 
props.image.map((image, i) => 
<div key={i} className='fadein'>
    <div onClick={() => props.removeImage(image.public_id)} className='delete'>
           
    </div>
    <img src={image.secure_url} alt='' />
</div>
)