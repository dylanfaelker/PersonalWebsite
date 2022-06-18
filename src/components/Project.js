import { Link } from "react-router-dom"

const Project = ({ project }) => {
    project.desc = project.desc.replaceAll('\\n', '\n');
    project.name = project.name.replaceAll('\\n', '\n');
    return (
        <div>
            {project.link ?
            <a class="project" data-description={project.desc} href={project.link} target="_blank" rel="noreferrer">
                {project.name}
            </a>:
            <Link to={project.inLink} class="project" data-description={project.desc}>
                {project.name}
            </Link>}
        </div>
    )
}

export default Project
