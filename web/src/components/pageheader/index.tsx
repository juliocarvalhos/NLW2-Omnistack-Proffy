import React from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css';

interface PageHeaderProps{
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return(
        <header id="" className="page-header">
                <div id="" className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt="voltar"/>
                    </Link>
                    
                    <img src={logoImg} alt="voltar"/>
                </div>

                <div id="" className="header-content">
                    <strong>{props.title}</strong>
                    {props.description && <p>{props.description}</p> }

                    {props.children}
                </div>

               
            </header>
    );
}
export default PageHeader;