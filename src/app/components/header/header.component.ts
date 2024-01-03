import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userPayload } from 'src/app/model/intranetModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VvfapiService } from 'src/app/services/vvfapi.service';


export interface Tile {
  id: number;
  color: string;
  cols: number;
  rows: number;
}

export interface Tab {
  label: string;
  content: string;
  redirect : string;
}

export interface Link {
  label: string;
  link: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, AfterViewInit{
  private subscription: Subscription;

  userPayload: userPayload = {
    userID : '',
    userRole: ''
  };
  
  constructor( private route: ActivatedRoute,
    private router: Router, public readonly vvfApiService: VvfapiService,
    private authService: AuthenticationService) {
    };

    ngAfterViewInit (): void {
    this.subscription = this.vvfApiService.logObs$.subscribe(() => {
      const token = this.authService.getToken();
      if(token){
        const user = JSON.parse(atob(token.split('.')[1]));
        this.userPayload ={
          userID: user.userID,
          userRole: user.userRole
        } 

      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  disconnect(){
    this.authService.setToken('')
    this.vvfApiService.datiSubject.next()
  }

  //Header grid subdivision
  tiles: Tile[] = [
    {id: 1, cols: 1, rows: 2, color: '#aa2824'},
    {id: 2, cols: 3, rows: 1, color: '#aa2824'},
    {id: 3, cols: 1, rows: 1, color: '#aa2824'},
    {id: 4, cols: 4, rows: 1, color: '#aa2824'},
    {id: 5, cols: 5, rows: 1, color: '#88201d'}
  ];

  //tabs list
  tabs: Tab[] = [
    {label: 'Home', content: '', redirect: ''},
    {label: 'Archivio', content: '', redirect: '/archivio'},
    {label: 'Contatti', content: '', redirect: '/contatti'},
    {label: 'Orari', content: '', redirect: '/orari'},
    {label: 'Uffici', content: '', redirect: '/uffici'},
    {label: 'Settori Operativi', content: '', redirect: '/settori_operativi'},
    {label: 'Manuali', content: '', redirect: '/manuali'},
    {label: 'Software', content: '', redirect: '/software'},
    {label: 'Link', content: '', redirect: '/link'},
    {label: 'Multimedia', content: '', redirect: '/multimedia'},
    {label: 'Servizio Informatico', content: '', redirect: '/servizio_informatico'},
    {label: 'LIFM', content: '', redirect: '/lifm'},
  ]

  //links
  links: Link[] = [
    {label: 'Protocollo', link: 'https://protocollo.dipvvf.it/'},
    {label: 'Posta Vigilfuoco', link: 'https://webmail1.vigilfuoco.it/'},
    {label: 'Intranet Nazionale', link: 'http://intranet.dipvvf.it'},
    {label: 'GEOVVF-CA', link: 'https://vvfsctas.maps.arcgis.com/sharing/oauth2/authorize?canHandleCrossOrgSignin=true&client_id=arcgisonline&response_type=code&state=%7B%22portalUrl%22%3A%22https%3A%2F%2Fvvfsctas.maps.arcgis.com%22%2C%22uid%22%3A%22hb2blSM4QJO_oe2zdjNxcETpDqxuA2R8hJhJRa_k_jk%22%7D&expiration=20160&redirect_uri=https%3A%2F%2Fvvfsctas.maps.arcgis.com%2Fapps%2Fwebappviewer%2Findex.html%3Fid%3D08c573a556d8472195e3a2227471a067&redirectToUserOrgUrl=true&code_challenge=GUzcaV4HkZREcOB8Zrv7WxdDhriDo_I6eXX5f3uG1s4&code_challenge_method=S256'},
    {label: 'GEOVVF-SAR', link: 'https://vvfsctas.maps.arcgis.com/sharing/oauth2/authorize?canHandleCrossOrgSignin=true&client_id=arcgisonline&response_type=code&state=%7B%22portalUrl%22%3A%22https%3A%2F%2Fvvfsctas.maps.arcgis.com%22%2C%22uid%22%3A%22cd-DEuPV1yWOfc6MdY4uzoo3oBkPDE9Tri2mrZA4KD0%22%7D&expiration=20160&redirect_uri=https%3A%2F%2Fvvfsctas.maps.arcgis.com%2Fapps%2Fwebappviewer%2Findex.html%3Fid%3D0a19eebdfcce4818b154ef83fdaa7c25%26extent%3D740473.3093%252C4633514.4752%252C1211019.6554%252C4891565.8827%252C102100&redirectToUserOrgUrl=true&code_challenge=cx2JB6H2G3AkmzAPv7ImYmEDt7SAgFjtVEavD-1l42o&code_challenge_method=S256'},
    {label: 'StatRi-Web', link: 'https://statri-web.dipvvf.it'},
    {label: 'Protezione Civile', link: 'https://www.protezionecivile.gov.it/it/'},
  ]

  login(){
    this.router.navigate(['login'], { relativeTo: this.route });

  }
}


