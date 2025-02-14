import Project from './Project'

const Projects = ({ projects }) => {
    return (
        <div className='section'>
            <h2>PROJECTS</h2>
            {projects.map((project) => (
                <Project
                    key={project.id} 
                    project={project}
                />
            ))}
        </div>
    )
}

export default Projects

