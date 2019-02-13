import React from 'react'

export default props =>
    <div className='buttons fadein'>
        <div className='button'>
            <label htmlFor='single'>
                <i class="fas fa-bowling-ball"></i>
            </label>
            <input type='file' id='single' onChange={props.onChange} />
        </div>

    {/* <div className='button'>
            <label htmlFor='multi'>
                <i class="fas fa-bowling-ball"></i>
            </label>
            <input type='file' id='multi' onChange={props.onChange} multiple />
    </div> */}
    </div>