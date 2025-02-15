import { Button } from "@mui/material";
import Icon from "@mui/material/Icon";
import { ButtonText } from "Frontend/components/ButtonText/index.js";
import React from "react";
import combinedShapeCopy from "./combined-shape-copy.svg";
import githubSeeklogo1 from "./github-seeklogo-1.png";
import logoTransparent1 from "./logo-transparent-1.png";
import mask from "./mask.svg";
import "./style.css";
import transhumansNewBeginnings1 from "./transhumans-new-beginnings-1.png";

export const LandingPageCom = () => {
  return (
    <div className="landing-page-COM">
      <div className="landing-page-v-COM">
        <div className="overlap">
          <img className="mask" alt="Mask" src={mask} />

          <img
            className="logo-transparent"
            alt="Logo transparent"
            src={logoTransparent1}
          />

          <img
            className="transhumans-new"
            alt="Transhumans new"
            src={transhumansNewBeginnings1}
          />
        </div>

        <div className="frame">
          <div className="header-light-left">
            <div className="div">
              <ButtonText
                icon="off"
                iconOnly="off"
                theme="light"
                type="squre"
              />
            </div>

            <Button
              color="primary"
              startIcon={<div>Placeholder element</div>}
              variant="contained"
            >
              Sign Up
            </Button>
            <Button
              color="primary"
              startIcon={<div>Placeholder element</div>}
              variant="outlined"
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className="text-wrapper">Sua Biblioteca Pessoal Digital</div>

        <div className="footer">
          <div className="top">
            <img
              className="img"
              alt="Logo transparent"
              src={logoTransparent1}
            />

            <div className="menu">
              <div className="frame-2">
                <Button
                  size="medium"
                  startIcon={<div>Placeholder element</div>}
                  variant="text"
                >
                  Home
                </Button>
                <Button size="medium" variant="text">
                  About
                </Button>
              </div>
            </div>

            <div className="frame-3">
              <Icon baseClassName="material-icons-two-tone" />
              <img
                className="github-seeklogo"
                alt="Github seeklogo"
                src={githubSeeklogo1}
              />

              <Icon />
            </div>
          </div>

          <div className="greelogix-all">
            <p className="greelogix-x-all">
              NotGoodReads @ 2025. All rights reserved.
            </p>
          </div>
        </div>

        <div className="overlap-group">
          <div className="BG">
            <div className="overlap-group-2">
              <img
                className="combined-shape-copy"
                alt="Combined shape copy"
                src={combinedShapeCopy}
              />

              <img className="object" alt="Object" />
            </div>
          </div>

          <p className="intro">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt.
          </p>

          <div className="section">
            <div className="content">
              <div className="section-text">
                <div className="top-2">
                  <div className="secondary-headline">
                    [TÍTULO SOBRE FUNCIONALIDADE]
                  </div>
                </div>

                <p className="paragraph">
                  Rhoncus morbi et augue nec, in id ullamcorper at sit.
                  Condimentum sit nunc in eros scelerisque sed. Commodo in
                  viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque
                  nullam sagittis, pulvinar.
                </p>
              </div>
            </div>

            <div className="screen-desktop">
              <div className="top-bar">
                <div className="circles">
                  <Icon baseClassName="material-icons-two-tone" />
                  <Icon baseClassName="material-icons-two-tone" />
                  <Icon baseClassName="material-icons-two-tone" />
                </div>

                <div className="arrows">
                  <Icon baseClassName="material-icons-two-tone" />
                  <Icon baseClassName="material-icons-two-tone" />
                </div>
              </div>

              <div className="placeholder-picture" />
            </div>
          </div>
        </div>

        <div className="overlap-wrapper">
          <div className="overlap-2">
            <div className="secondary-headline-2">Comece agora</div>

            <div className="div-2" />
          </div>
        </div>
      </div>
    </div>
  );
};