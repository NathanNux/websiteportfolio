import { useEffect, useState } from 'react';
import axios from 'axios';


import Image from 'next/image';
import Link from 'next/link';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { scale, slideUp } from '@/components/anim';
import { useLoad } from '@/context';

export default function Contact() {
    const [customStyles, setCustomStyles] = useState([]);
    const { isHomeCountry } = useLoad();
    const [formState, setFormState] = useState({
        name: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        services: [],
        message: ''
    });

    const { toast } = useToast();

    const options = [
        {
            value:  isHomeCountry ? 'Celý Balíček' : 'Full Package', label: isHomeCountry ? 'Celý Balíček' : "Full Package"
        },
        {
            value: 'SEO', label: 'SEO'
        },
        {
            value: 'Marketing', label: 'Marketing'
        },
        {
            value: 'Re-branding', label: 'Re-branding'
        },
        {
            value: 'Re-design', label: 'Re-design'
        }
    ]

    useEffect(() => {
        const generateStyles = () => {
            return{
                control: (provided, state) => ({
                    ...provided,
                    background: 'transparent',
                    border: 'none',
                    padding: '2rem',
                    marginLeft: '1rem',
                    fontFamily: 'Inter',
                    boxShadow: state.isFocused ? 0 : 0,
                    "&:hover": {
                    border: 'none',
                    }
                }),
                
                multiValueRemove: (provided) => ({
                    ...provided,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    '&:hover': {
                        border: 'none',
                        backgroundColor: 'transparent',
                    },
                    svg: {
                        position: 'relative',
                        width: '20px',
                        height: '20px'
                    }
                }),
        
                valueContainer: (provided) => ({
                    ...provided,
                    padding: '0',
                }),
        
                input: (provided) => ({
                    ...provided,
                    color: '#6a6a6a',
                    fontSize: '1.5rem',
                    fontFamily: 'Inter',
                    fontWeight: '300',  
                }),
        
                clearIndicator: (provided) => ({
                    ...provided,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#6a6a6a',
                    position: "relative",
                    svg: {
                        position: 'relative',
                        width: '20px',
                        height: '20px'
                    }
                }),
                placeholder: (provided) => ({
                    ...provided,
                    color: '#6a6a6a',
                    fontSize: '1.8rem',
                    fontFamily: 'Inter',
                    fontWeight: '300',
                    opacity: '0.7',
                }),
        
                multiValue: (provided) => ({
                    ...provided,
                    background: '#f1f1f1',
                    borderRadius: '25px',
                    padding: '0.05rem 0.5rem',
                }),
        
                multiValueLabel: (provided) => ({
                    ...provided,
                    color: '#6a6a6a',
                    fontSize: '1.5rem',
                    margin: '0',
                }),
        
                dropdownIndicator: (provided) => ({
                    ...provided,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#6a6a6a',
                    position: "relative",
                    svg: {
                        position: 'relative',
                        width: '20px',
                        height: '20px'
                    }
                }),
                
                indicatorSeparator: (provided) => ({
                    ...provided,
                    backgroundColor: '#6a6a6a',
                    opacity: '1',
                    width: '0.5px', 
                }),
        
                menu: (provided) => ({
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '25px',
                    padding: '1rem',
                    fontSize: '1.5rem',
                    color: '#6a6a6a',
                }),
        
                option: (provided) => ({
                    ...provided,
                    borderRadius: '25px',
                }),

            }
        };
        setCustomStyles(generateStyles());
    }, []);

    const handleInputChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectChange = (selectedOptions) => {
        const selectedServices = selectedOptions.map(option => option.value);
        setFormState({
            ...formState,
            services: selectedServices
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(formState.name.length === 0){
            toast({
                title: isHomeCountry ? 'Doplňte jméno' : 'Fill in your name',
                description: isHomeCountry ? 'Prosím, vyplňte Vaše jméno.' : 'Please, fill in your name.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(formState.companyName.length === 0){
            toast({
                title: isHomeCountry ? 'Doplňte jméno firmy' : 'Fill in your company name',
                description: isHomeCountry ? 'Prosím, vyplňte jméno Vaší firmy.' : 'Please, fill in your company name.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(formState.email.length === 0){
            toast({
                title: isHomeCountry ? 'Doplňte email' : 'Fill in your email',
                description: isHomeCountry ? 'Prosím, vyplňte Váš email.' : 'Please, fill in your email.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(formState.services.length === 0){
            toast({
                title: isHomeCountry ? 'Vyberte službu' : 'Choose a service',
                description: isHomeCountry ? 'Prosím, vyberte službu, kterou chcete.' : 'Please, choose a service you want.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        // handle form submission here
        try {
            const response = await axios.post('/api/contact', formState);
            console.log(response.data);
            toast({
                title: isHomeCountry ? 'Úspěch' : 'Success',
                description: isHomeCountry ? 'Vaše zpráva byla odeslána' : 'Your message has been sent',
                status: 'success',
                duration: 5000,
                isClosable: true,
            
            })
        } catch (error) {
            console.error(error);
            toast({
                title: isHomeCountry ? 'Chyba' : 'Error',
                description: isHomeCountry ? 'Došlo k chybě. Kontaktujte mě prosím telefonicky nebo použijte kalendář níže.' : 'An error occurred. Please contact me by phone or use the calendar below.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    };

    return (
        <motion.section variants={slideUp} initial="initial" animate='enter' className="mainContactIntro">
            <div className="toast">
                <Toaster />
            </div>
            <div className="headerIntro">
                <h1>{ isHomeCountry ? "Pojďme se Spojit," : "Let's Connect, "} <br />{ isHomeCountry ? "Budovat a Uspět!" : "Build and Succeed!"}</h1>
                <div className="imageContainer" data-scroll data-scroll-speed={0.05}>
                    <Image src="/images/landing/background.webp" alt="photo" quality={20} loading='lazy' fill={true} sizes="(max-width: 1350px) 15vh, (max-width: 950px) 20vw, (max-width: 500px) 20vw, 10vw" />
                </div>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>01</span>{ isHomeCountry ? "Jaké je Vaše Jméno" : "What's your Name?"}</p>
                        </div>
                        <input type="text" name="name" value={formState.name} onChange={handleInputChange} placeholder="John Doe *"/>
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>02</span>{ isHomeCountry ? "Jak se jmenuje Vaše firma?" : "What's your Firm called?"}</p>
                        </div>
                        <input type="text" name="companyName" value={formState.companyName} onChange={handleInputChange} placeholder="John & Doe corp. *"/>
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>03</span>{ isHomeCountry ? "Jaký je Váš E-mail?" : "What's your E-mail?"}</p>
                        </div>
                        <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="john@doe.com *"/>
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>04</span>{ isHomeCountry ? "Jaké je Vaše tel.číslo?" : "What's your Phone number?"}</p>
                        </div>
                        <input type="tel" name="phoneNumber" value={formState.phoneNumber} onChange={handleInputChange} placeholder="V případě, že chcete, abych Vám zavolal." />
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>05</span>{ isHomeCountry ? "Co pro Vás mohu udělat?" : "What can I do for You?"}</p>
                        </div>
                        <div className="selectWrapper">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <Select
                                isMulti
                                name="services"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                styles={customStyles}
                                placeholder={ isHomeCountry ? "Vyberte službu..." : "Choose a service..."}
                            />
                        </motion.div>
                        </div>              
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>06</span>{ isHomeCountry ? "Vaše zpráva" : "Your Message"}</p>
                        </div>
                        <textarea name="message" value={formState.message} onChange={handleInputChange} placeholder="Ahoj Matěji, potřebovali bychom... "></textarea>
                    </div>
                    <div className="buttonSubmit">
                         <Button title={isHomeCountry ? 'Poslat' : 'Send'} onClick={handleSubmit} className="buttonLink"/>
                    </div>
                </form>
                <div className="addInfo">
                    <div className="info">
                        <h2>{ isHomeCountry ? "Kontaktní informace" : "Contact Information"}</h2>
                        <p>forejtovic@gmail.com</p>
                        <p>+420 776 157 476</p>
                    </div>
                    <div className="info">
                        <h2>{ isHomeCountry ? "Další informace" : "Additional Information"}</h2>
                        <p>{ isHomeCountry ?  "Lokace: Česká republika" : "Location: Czech Republic"}</p>
                        <p>{ isHomeCountry ?  "Kraj: Jihočeský" : "State: Jihocesky"}</p>
                        <p>{ isHomeCountry ? "Město: Písek" : "City: Pisek"}</p>
                    </div>
                    <div className="info">
                        <h2>{ isHomeCountry ? "Sociální sítě" : "My Socials"}</h2>
                        <Link href="/">LinkedIn</Link>
                        <Link href="/">Facebook</Link>
                        <Link href="/">Instagram</Link>
                    </div>
                    <div className="info">
                        <h2>{ isHomeCountry ? "Ocenění (V budoucnu)" : "Awards (In future)"}</h2>
                        <Link href="/">Awwwards</Link>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
const Button =({ title, onClick }) => {
    const [ isHovered, setIsHovered ] = useState(false);
    return (
        <div className="mainButton" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick}>
            <div className="link">
                <p>{title}</p>
            </div>
            <motion.div className="dot" variants={scale} initial='initial' animate={isHovered ? 'enter' : 'exit'}></motion.div>
        </div>
    )
}