import styles from './styles.module.scss';
import Link from 'next/link';
import ButtonLink from '@/components/ui/linkButton';
import { NewestProjects } from '@/constants';

export default function Index ({setActiveProject}) {

    // function that debounces the mouseleave event ==> fixes the laggy hover effect
    function debounce(fn, delay) {
        let timerId;
        return function(...args) {
            if(timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                fn(...args);
                timerId = null;
            }, delay);
        }
    }

    return (
        <div className={styles.main} > 
            <ul onMouseLeave={debounce(() => {setActiveProject(null)}, 50)}>
                {NewestProjects.map((project, i) => {
                    return (
                        <li key={i} onMouseOver={debounce(() => {setActiveProject(i)}, 50)}>
                            <Link href={project.link}>
                                <h2>{project.title}</h2>
                                <p>{project.date}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.button}>
               <ButtonLink title='Více Projektů' href='/projects' className={styles.buttonLink}/> 
            </div>
        </div>
    );
}