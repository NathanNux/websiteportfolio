import { useEffect, useState } from 'react';
import axios from 'axios';


import Image from 'next/image';
import Link from 'next/link';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { scale, slideUp } from '@/components/anim';

export default function Contact() {
    const [customStyles, setCustomStyles] = useState([]);
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
            value: 'Celý Balíček', label: 'Celý Balíček'
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
            value: 'Re-desing', label: 'Re-desing'
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
                title: 'Doplňte jméno',
                description: 'Prosím, vyplňte Vaše jméno.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(formState.companyName.length === 0){
            toast({
                title: 'Doplňte jméno firmy',
                description: 'Prosím, vyplňte jméno Vaší firmy.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(formState.email.length === 0){
            toast({
                title: 'Doplňte email',
                description: 'Prosím, vyplňte Váš email.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(formState.services.length === 0){
            toast({
                title: 'Vyberte službu',
                description: 'Prosím, vyberte službu, kterou chcete.',
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
                title: 'Success',
                description: 'Your message has been sent',
                status: 'success',
                duration: 5000,
                isClosable: true,
            
            })
        } catch (error) {
            console.error(error);
            toast({
                title: 'Chyba',
                description: 'Došlo k chybě. Kontaktujte mě prosím telefonicky nebo použijte kalendář níže.',
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
                <h1>Pojďme se spojit, <br />budovat a uspět!</h1>
                <div className="imageContainer" data-scroll data-scroll-speed={0.05}>
                    <Image src="/images/landing/background.webp" alt="photo" quality={20} loading='lazy' fill={true} sizes="(max-width: 1350px) 15vh, (max-width: 950px) 20vw, (max-width: 500px) 20vw, 10vw" />
                </div>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>01</span>Jaké je Vaše Jméno</p>
                        </div>
                        <input type="text" name="name" value={formState.name} onChange={handleInputChange} placeholder="John Doe *"/>
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>02</span>Jak se jmenuje Vaše firma?</p>
                        </div>
                        <input type="text" name="companyName" value={formState.companyName} onChange={handleInputChange} placeholder="John & Doe corp. *"/>
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>03</span>Jaký je Váš E-mail?</p>
                        </div>
                        <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="john@doe.com *"/>
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>04</span>Jaké je Vaše tel.číslo?</p>
                        </div>
                        <input type="tel" name="phoneNumber" value={formState.phoneNumber} onChange={handleInputChange} placeholder="V případě, že chcete, abych Vám zavolal." />
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>05</span>Co pro Vás mohu udělat?</p>
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
                                placeholder="Vyberte službu..."
                            />
                        </motion.div>
                        </div>              
                    </div>
                    <div className="inputContainer">
                        <div className="inputText">
                            <p><span>06</span>Vaše zpráva</p>
                        </div>
                        <textarea name="message" value={formState.message} onChange={handleInputChange} placeholder="Ahoj Matěji, potřebovali bychom... "></textarea>
                    </div>
                    <div className="buttonSubmit">
                         <Button title='Poslat' onClick={handleSubmit} className="buttonLink"/>
                    </div>
                </form>
                <div className="addInfo">
                    <div className="info">
                        <h2>Kontaktní informace</h2>
                        <p>forejtovic@gmail.com</p>
                        <p>+420 776 157 476</p>
                    </div>
                    <div className="info">
                        <h2>Další informace</h2>
                        <p>Lokace: Česká republika</p>
                        <p>Kraj: Jihočeský</p>
                        <p>Město: Písek</p>
                    </div>
                    <div className="info">
                        <h2>Sociální sítě</h2>
                        <Link href="/">LinkedIn</Link>
                        <Link href="/">Facebook</Link>
                        <Link href="/">Instagram</Link>
                    </div>
                    <div className="info">
                        <h2>Ocenění (V budoucnu)</h2>
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