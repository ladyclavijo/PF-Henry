import { useState } from 'react'
// import { ReadLine } from 'react-icons/ri';
import { RiAddLine} from 'react-icons/ri';
import styles from './Faq.module.css'
import accordingData from './accordingData.js';
const Faq = () => {

    const [accActive, setAccActive] = useState();
    
    
    const handleActive = (index) => {
        accActive === index ? setAccActive() : setAccActive(index)
    }
  return (
    <div className={styles.accordionContainerA}>

        <div className='title-freq-quest'>
        <div className={styles.titleContainer}>
            <h2 className={`${styles.title} ${styles.blue}`}>
                FREQUENT <span className={styles.blue}> QUESTIONS
                </span>
            </h2>
        </div>
        </div>

        <div className={styles.accordionContainerB}>
        {
            accordingData.map((acc, index) => {
                return (
                    <div key={index} className={styles.accordion}
                        onClick={() => handleActive(index)}>
                        <div className={styles.accordionHeading}>
                            <span className={styles.addIcon}
                                style={{
                                    transform:`${accActive === index ? 'rotate(45deg)' : 'rotate(0deg)'}`
                                }}>
                                <RiAddLine size={16} />
                            </span>
                            <h3>{acc.title}</h3> 
                        </div>
                        {
                            accActive === index 
                            ? <div className={styles.accordionContent}>{acc.accordionContent}</div> 
                            : null
                        }
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default Faq;