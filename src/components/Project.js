const Project = ({ project, onHover, onClick}) => {
    return (
        <a class="project" data-description={project.desc} href={project.link} target="_blank" rel="noreferrer">
            {project.name}
        </a>
    // <div
        //     className='project' 
        //     onMouseEnter={() => onHover(project.id, false)} 
        //     onMouseLeave={() => onHover(project.id, true)}
        //     onClick={() => onClick(project.link)}
        // >
        //     {project.display ? project.name : project.desc}
        // </div>
    )
}

export default Project
