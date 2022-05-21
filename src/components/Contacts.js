import { ReactComponent as InstagramIcon } from '../instagram.svg'
import { ReactComponent as GithubIcon } from '../github.svg'
import { ReactComponent as EmailIcon } from '../email.svg'
import { ReactComponent as LinkedinIcon } from '../linkedin.svg'
import { ReactComponent as PageIcon } from '../page.svg'
import ResumePDF from '../Resume.pdf'

const Contacts = () => {
    return (
        <div class="contacts">
            <a
            href={ResumePDF}
            target="_blank"
            rel="noreferrer"
            >
            <PageIcon class="contact"/>
            </a>
            <a
            href="mailto:faelkerd@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            >
            <EmailIcon class="contact"/>
            </a>
            <a
            href="https://github.com/dylanfaelker"
            target="_blank"
            rel="noopener noreferrer"
            >
            <GithubIcon class="contact"/>
            </a>
            <a
            href="https://www.linkedin.com/in/dylanfaelker/"
            target="_blank"
            rel="noopener noreferrer"
            >
            <LinkedinIcon class="contact"/>
            </a>
            <a
            href="https://www.instagram.com/d_faelker/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            >
            <InstagramIcon class="contact"/>
            </a>
        </div>
    )
}

export default Contacts
