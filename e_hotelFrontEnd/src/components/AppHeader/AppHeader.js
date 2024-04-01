import { useEffect, useState } from "react";
import "./AppHeader.css";
import { useNavigate } from "react-router-dom";
import connexionCompte from "../../services/connexion-compte";

export const AppHeader=(info)=>{

    const [userInfo, setUserInfo] = useState({
        nas: '',
        prenom: '',
        nomFamille: '',
        numero: '',
        rue: '',
        ville: '',
        province: '',
        pays: '',
        codePostal: ''
    });

    const navigate = useNavigate();
    const [roleUser, setRoleUser] = useState('');

    useEffect(() => {

        const user = info.info;

        // get info
        if (info.isUserTypeClient) {
            // Client

            getClientInfo();

            if (user !== undefined) {
                setUserInfo({
                    nas: user.nas,
                    prenom: user.prenom,
                    nomFamille: user.nomFamille,
                    numero: user.numero,
                    rue: user.rue,
                    ville: user.ville,
                    province: user.province,
                    pays: user.pays,
                    codePostal: user.codePostal
                });
            } else {
                console.log("is undefined.. do nothing")
            }
        } 
        else if (info.isUserTypeClient == false) {
            
            // get employe info
            getEmployeInfo();
        

            if (user !== undefined) {
                setUserInfo({
                    nas: user.id,
                    prenom: user.prenom,
                    nomFamille: user.nomFamille,
                    numero: user.numero,
                    rue: user.rue,
                    ville: user.ville,
                    province: user.province,
                    pays: user.pays,
                    codePostal: user.codePostal
                });
            } else {
                console.log("is undefined.. do nothing")
            }
        }
    }, []);

    const getEmployeInfo = async() => {
        try {
            await connexionCompte.getInfoEmploye(info.info.id).then((reponse) => {
                connexionCompte.getInfoCompteEmploye(info.info.id).then(() => {
                    console.log("retrieved employe info")
                    console.log(reponse.data);
                });

                setUserInfo({
                    nas: reponse.data.id,
                    prenom: reponse.data.prenom,
                    nomFamille: reponse.data.nomFamille,
                    numero: reponse.data.numero,
                    rue: reponse.data.rue,
                    ville: reponse.data.ville,
                    province: reponse.data.province,
                    pays: reponse.data.pays,
                    codePostal: reponse.data.codePostal
                });

                // Determine si c'est un employe normal ou admin
                setRoleUser(reponse.data.roleEmploye)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getClientInfo = async() => {
        try {
            await connexionCompte.getInfoClient(info.info.nas).then((reponse) => {
                console.log("PASSSSSSSS")

                setUserInfo({
                    nas: reponse.data.nas,
                    prenom: reponse.data.prenom,
                    nomFamille: reponse.data.nomFamille,
                    numero: reponse.data.numero,
                    rue: reponse.data.rue,
                    ville: reponse.data.ville,
                    province: reponse.data.province,
                    pays: reponse.data.pays,
                    codePostal: reponse.data.codePostal
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    const goToProfile = () => {
        console.log("going to user profile.")
        navigate("/showUserProfile", {state: {userInfo: userInfo, isClientUser: info.isUserTypeClient}});
    }

    return(
        <div className="header">
            <div className="d-flex justify-content-between">
                <div className="title">Bienvenue à Hotelio</div>
        
                <div className="d-flex align-content-center align-items-center">
                    { info.info !== undefined ?
                        <>
                            <div className="text-end me-3">
                                <h5 className="my-auto">{userInfo.nomFamille}, {userInfo.prenom}</h5>
                                <p className="fst-italic p-0 m-0"> {roleUser}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="black" class="bi bi-person-fill" viewBox="0 0 16 15">
                                <a style={{cursor: 'pointer'}} onClick={goToProfile}>
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </a>
                            </svg>
                        </>
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
} 