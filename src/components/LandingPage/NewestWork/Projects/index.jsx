import Link from 'next/link';
import ButtonLink from '@/components/common/LinkButton/linkButton';
import { NewestProjects, NewestProjectsEN } from '@/constants';
import { useLoad } from '@/context';

export default function Index ({setActiveProject}) {
    const { isHomeCountry } = useLoad();

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
        <div className="mainNewestProjects" > 
            <ul onMouseLeave={debounce(() => {setActiveProject(null)}, 50)}>
                { isHomeCountry ? 
                    (
                        NewestProjects.map((project, i) => {
                            return (
                                <li key={i} onMouseOver={debounce(() => {setActiveProject(i)}, 50)}>
                                    <Link href={project.link}>
                                        <h2>{project.title}</h2>
                                        <p>{project.date}</p>
                                    </Link>
                                </li>
                            )
                        })
                ):  (
                        NewestProjectsEN.map((project, i) => {
                            return (
                                <li key={i} onMouseOver={debounce(() => {setActiveProject(i)}, 50)}>
                                    <Link href={project.link}>
                                        <h2>{project.title}</h2>
                                        <p>{project.date}</p>
                                    </Link>
                                </li>
                            )
                        })
                    )
                }
            </ul>
            <div className="button">
               <ButtonLink title={ isHomeCountry ? 'Více Projektů' : "More Projects"} href='/projects' className="buttonLink"/> 
            </div>
        </div>
    );
}