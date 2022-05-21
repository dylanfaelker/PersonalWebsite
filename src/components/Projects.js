import Project from './Project'

const Projects = ({ projects, onHover, onClick}) => {
    return (
        <div className='section'>
            <h2>PROJECTS</h2>
            {projects.map((project) => (
                <Project
                    key={project.id} 
                    project={project}
                    onHover={onHover}
                    onClick={onClick}
                />
            ))}
        </div>
    )
}

export default Projects

