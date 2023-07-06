import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { PageComponent } from './components/page/page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { OdgComponent } from './components/odg/odg.component';
import { NormativaComponent } from './components/normativa/normativa.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { OrariComponent } from './components/orari/orari.component';
import { SettoriOperativiComponent } from './components/settori-operativi/settori-operativi.component';
import { UfficiComponent } from './components/uffici/uffici.component';
import { ManualiComponent } from './components/manuali/manuali.component';
import { SoftwareComponent } from './components/software/software.component';
import { LinkComponent } from './components/link/link.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';
import { ServizioInformaticoComponent } from './components/servizio-informatico/servizio-informatico.component';
import { DdsComponent } from './components/dds/dds.component';
import { ArchivioComponent } from './components/archivio/archivio.component';
import { NumeriInterniComponent } from './components/numeri-interni/numeri-interni.component';
import { NbcrComponent } from './components/nbcr/nbcr.component';
import { CovidComponent } from './components/covid/covid.component';
import { NumeriServizioInformaticoComponent } from './components/numeri-servizio-informatico/numeri-servizio-informatico.component';
import { ModelliDocumentiComponent } from './components/modelli-documenti/modelli-documenti.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MongodbService } from './services/mongodb.service';
import { LifmComponent } from './components/lifm/lifm.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageComponent,
    FooterComponent,
    HomeComponent,
    OdgComponent,
    NormativaComponent,
    ContattiComponent,
    OrariComponent,
    SettoriOperativiComponent,
    UfficiComponent,
    ManualiComponent,
    SoftwareComponent,
    LinkComponent,
    MultimediaComponent,
    ServizioInformaticoComponent,
    DdsComponent,
    ArchivioComponent,
    NumeriInterniComponent,
    NbcrComponent,
    CovidComponent,
    NumeriServizioInformaticoComponent,
    ModelliDocumentiComponent,
    LifmComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatTabsModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    PdfJsViewerModule,
    MatSidenavModule,
    MatTreeModule,
    MatInputModule,
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [MongodbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
