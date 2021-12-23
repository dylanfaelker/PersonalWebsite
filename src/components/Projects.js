import Project from './Project'

const Projects = ({ projects, onHover}) => {
    return (
        <div className='section'>
            <header className='header'>
                <h1>Projects</h1>
            </header>
            {projects.map((project) => (
                <Project
                    key={project.id} 
                    project={project}
                    onHover={onHover}
                />
            ))}
        </div>
    )
}

export default Projects

