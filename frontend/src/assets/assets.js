import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James specializes in internal medicine, chronic disease management, preventive health screenings, and lifestyle-based intervention strategies. Experienced in managing hypertension, diabetes, and cardiovascular risk. Skilled in primary care diagnostics and evidence-based treatment planning.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson expertise in reproductive endocrinology, prenatal care, menstrual disorders, and pelvic inflammatory disease. Performs gynecological procedures including Pap smears, ultrasounds, and laparoscopies. Experienced in managing PCOS, infertility, and hormonal imbalances.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sarah Patel is a dedicated dermatologist specializing in the diagnosis and treatment of a wide range of skin, hair, and nail conditions. With a focus on personalized care, she combines clinical expertise with the latest advancements in dermatology to provide effective solutions for her patients. Dr. Patel is committed to enhancing her patient well-being through compassionate and comprehensive dermatologic care.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee is a caring pediatrician dedicated to nurturing children’s health from infancy through adolescence. He emphasizes preventive care, growth monitoring, and family-centered support to ensure each child thrives. Dr. Lee combines medical expertise with a warm, approachable style to build trusting relationships with both patients and their families.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Gracia is a dedicated neurologist specializing in the comprehensive care of patients with neurological disorders. She combines advanced diagnostic techniques with a compassionate approach to deliver personalized treatment plans. Dr. Gracia is committed to improving quality of life through patient education and cutting-edge therapies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams is a skilled neurologist specializing in the diagnosis and treatment of a wide range of neurological disorders. He is dedicated to providing compassionate, patient-focused care and utilizing the latest advancements in neurology. Dr. Williams strives to improve patient outcomes through personalized treatment plans and ongoing research.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis is a trusted general physician providing comprehensive primary care for patients of all ages. He emphasizes preventive health, chronic disease management, and holistic wellness. Known for his attentive and approachable style, Dr. Davis builds strong, lasting relationships with his patients. He is dedicated to delivering personalized, evidence-based care tailored to each individual needs.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White is a board-certified gynecologist specializing in women’s reproductive health, fertility, and minimally invasive gynecologic procedures. He is dedicated to providing compassionate, individualized care at every stage of a woman’s life. Dr. White is known for his clear communication and patient-focused approach. He integrates the latest medical advancements to ensure the best outcomes for his patients.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ava Mitchell is a board-certified dermatologist specializing in skin, hair, and nail disorders, as well as cosmetic dermatology. She is committed to providing personalized, evidence-based treatments for patients of all ages. Known for her meticulous care and attention to detail, Dr. Mitchell helps patients achieve both healthy and confident skin. She stays current with the latest advancements in dermatologic science and technology.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King is a compassionate pediatrician dedicated to the health and well-being of children from infancy through adolescence. He provides comprehensive care including preventive health, developmental monitoring, and acute illness management. Dr. King is known for his warm, approachable manner and strong communication with families. He focuses on creating a supportive environment for both children and parents.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly is a board-certified neurologist with expertise in managing complex neurological conditions, including multiple sclerosis, migraines, and movement disorders. She combines clinical precision with a patient-centered approach to deliver personalized care. Dr. Kelly is committed to empowering patients through education and support. She actively incorporates the latest research and technologies into her practice.',
        fees: 80,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris is a highly skilled neurologist specializing in the diagnosis and treatment of disorders of the brain, spine, and nervous system. He offers expert care for conditions such as epilepsy, migraines, stroke, and neurodegenerative diseases. Dr. Harris is known for his analytical approach and compassionate patient care. He integrates the latest neurological research into his clinical practice.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans is a dedicated general physician providing comprehensive primary care for patients of all ages. She focuses on preventive medicine, chronic disease management, and holistic patient wellness. Known for her empathetic and thorough approach, Dr. Evans builds lasting relationships with her patients. She is committed to delivering evidence-based care tailored to individual needs.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez is a board-certified gynecologist specializing in women’s reproductive health, wellness, and minimally invasive procedures. He provides compassionate, comprehensive care across all stages of a woman life. Dr. Martinez is known for his patient-first approach and clear communication. He stays up to date with the latest advancements in gynecology to offer the best outcomes.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Amelia Hill is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. With a passion for skin health and personalized care, she helps patients achieve healthy, radiant skin. Dr. Hill combines evidence-based treatments with a patient-centered approach. She is committed to staying at the forefront of dermatologic innovation and education.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]