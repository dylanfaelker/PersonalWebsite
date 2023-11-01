import { ReactComponent as GithubIcon } from '../github.svg'
import { ReactComponent as EmailIcon } from '../email.svg'
import { ReactComponent as LinkedinIcon } from '../linkedin.svg'
import { ReactComponent as PageIcon } from '../page.svg'
import ResumePDF from '../Resume.pdf'

import './Contacts.css'

const Contacts = () => {
    return (
        <div class="contacts">
            <a
            href={ResumePDF}
            target="_blank"
            rel="noreferrer"
            >
            <PageIcon class="icon-small icon"/>
            </a>
            <a
            href="mailto:faelkerd@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            >
            <EmailIcon class="icon-small icon"/>
            </a>
            <a
            href="https://github.com/dylanfaelker"
            target="_blank"
            rel="noopener noreferrer"
            >
            <GithubIcon class="icon-small icon"/>
            </a>
            <a
            href="https://www.linkedin.com/in/dylanfaelker/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <LinkedinIcon class="icon-small icon"/>
            </a>
        </div>
    )
}

export default Contacts
