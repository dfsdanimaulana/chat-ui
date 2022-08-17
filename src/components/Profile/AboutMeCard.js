import React from 'react'

const AboutMeCard = () => {
    return (
        /* About Me Box */
        <div className='card card-primary m-3 collapse show-sm' id='aboutMeCard'>
            <div className='card-header'>
                <h3 className='card-title'>About Me</h3>
            </div>
            {/* /.card-header */}
            <div className='card-body'>
                <strong>
                    <i className='fas fa-book mr-1' /> Education
                </strong>
                <p className='text-muted'>
                    B.S. in Computer Science from the University of Tennessee at
                    Knoxville
                </p>
                <hr />
                <strong>
                    <i className='fas fa-map-marker-alt mr-1' /> Location
                </strong>
                <p className='text-muted'>Malibu, California</p>
                <hr />
                <strong>
                    <i className='fas fa-pencil-alt mr-1' /> Skills
                </strong>
                <p className='text-muted'>
                    <span className='tag tag-danger'>UI Design</span>
                    <span className='tag tag-success'>Coding</span>
                    <span className='tag tag-info'>Javascript</span>
                    <span className='tag tag-warning'>PHP</span>
                    <span className='tag tag-primary'>Node.js</span>
                </p>
                <hr />
                <strong>
                    <i className='far fa-file-alt mr-1' /> Notes
                </strong>
                <p className='text-muted'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam fermentum enim neque.
                </p>
            </div>
            {/* /.card-body */}
        </div>
        // /* /.card */
    )
}

export default AboutMeCard