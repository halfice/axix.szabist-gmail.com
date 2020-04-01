import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';

import { Dialog } from '@microsoft/sp-dialog';

import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';



import styles from './AppCustomizer.module.scss';
 	import { escape } from '@microsoft/sp-lodash-subset';


import * as strings from 'HeaderfooterextensionApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HeaderfooterextensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderfooterextensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
  cssurl: string;

}



/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderfooterextensionApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderfooterextensionApplicationCustomizerProperties> {


    // These have been added
    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;



  @override
  public onInit(): Promise<void> {
    const cssUrl: string = this.properties.cssurl;
    if (cssUrl) {


      let articleRedirectScriptTag: HTMLScriptElement = document.createElement("script");
      articleRedirectScriptTag.src = "https://azizi021.sharepoint.com/Style%20Library/myscript.js";
      articleRedirectScriptTag.type = "text/javascript";
      document.body.appendChild(articleRedirectScriptTag);

      


      const heads: any = document.getElementsByTagName("head")[0] || document.documentElement;
      let customJS: HTMLScriptElement = document.createElement("script");
      customJS.type = "text/javascript";
      customJS.src = "https://azizi021.sharepoint.com/Style%20Library/myscript.js";
      heads.insertAdjacentElement("beforeEnd", customJS);



        // inject the style sheet
        const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
        let customStyle: HTMLLinkElement = document.createElement("link");
        customStyle.href = cssUrl;
        customStyle.rel = "stylesheet";
        customStyle.type = "text/css";
        head.insertAdjacentElement("beforeEnd", customStyle);
    }

    this.context.placeholderProvider.changedEvent.add(this,this._renderPlaceHolders);
    return Promise.resolve();
  }
  private _renderPlaceHolders(): void {
    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

      const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
      let customStyle: HTMLLinkElement = document.createElement("link");
      customStyle.href = "https://azizi021.sharepoint.com/SiteAssets/mine.css";
      customStyle.rel = "stylesheet";
      customStyle.type = "text/css";
      head.insertAdjacentElement("beforeEnd", customStyle);


    if (!this._topPlaceholder){
        this._topPlaceholder= this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,{onDispose:this._onDispose}
          );//try create method end
    }//top place holder

    if (!this._topPlaceholder){
      console.log("Place holder top not found");
      return;
    }

    if (this.properties) {
      let topString: string = this.properties.Top;
      if (!topString) {
        topString = "(Top property was not defined.)";
      }

      if (this._topPlaceholder.domElement) {
        this._topPlaceholder.domElement.innerHTML = `
        <div class="${styles.app}">
          <div class="${styles.top}">
           
          </div>
        </div>`;
      }
    }

    // Handling the bottom placeholder
 		if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "© Copyright 2020 Half-Ice, LLC";
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${styles.bottom}">
              ${escape(
                bottomString
              )}
             
   <hr>
  <div>
  <div class="${styles.innerdiv}" > <h4> SharePoint Solution </h4></div> 
  <div class="${styles.innerdiv}" >  <h4> TensorFlow  </h4> </div> 
  <div class="${styles.innerdiv}"> <h4> Machine Learning </h4> </div> 
  </div>
   </div><hr>
            
           
          </div>`;
        }
      }
    }






  }

  private _onDispose():void{
    console.log("log has been dispose!!!!");
  }




}
