const Project = ({ project, onHover}) => {
    return (
        <a
            className='projectLink'
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div 
                className='project' 
                onMouseEnter={() => onHover(project.id, false)} 
                onMouseLeave={() => onHover(project.id, true)}
            >
                {project.display ? project.name : project.desc}
            </div>
        </a>
    )
}

export default Project
