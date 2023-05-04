import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivioComponent } from './components/archivio/archivio.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { CovidComponent } from './components/covid/covid.component';
import { DdsComponent } from './components/dds/dds.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LifmComponent } from './components/lifm/lifm.component';
import { LinkComponent } from './components/link/link.component';
import { ManualiComponent } from './components/manuali/manuali.component';
import { ModelliDocumentiComponent } from './components/modelli-documenti/modelli-documenti.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';
import { NbcrComponent } from './components/nbcr/nbcr.component';
import { NormativaComponent } from './components/normativa/normativa.component';
import { NumeriInterniComponent } from './components/numeri-interni/numeri-interni.component';
import { NumeriServizioInformaticoComponent } from './components/numeri-servizio-informatico/numeri-servizio-informatico.component';
import { OdgComponent } from './components/odg/odg.component';
import { OrariComponent } from './components/orari/orari.component';
import { PageComponent } from './components/page/page.component';
import { ServizioInformaticoComponent } from './components/servizio-informatico/servizio-informatico.component';
import { SettoriOperativiComponent } from './components/settori-operativi/settori-operativi.component';
import { SoftwareComponent } from './components/software/software.component';
import { UfficiComponent } from './components/uffici/uffici.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "odg", component: OdgComponent},
  { path: "dds", component: DdsComponent},
  { path: "archivio", component: ArchivioComponent},
  { path: "numeri_interni", component: NumeriInterniComponent},
  { path: "nbcr", component: NbcrComponent},
  { path: "link", component: LinkComponent},
  { path: "covid", component: CovidComponent},
  { path: "numeri_servizio_informatico", component: NumeriServizioInformaticoComponent},
  { path: "orari", component: OrariComponent},
  { path: "modelli_documenti", component: ModelliDocumentiComponent},
  { path: "normativa", component: NormativaComponent},
  { path: "contatti", component: ContattiComponent},
  { path: "uffici", component: UfficiComponent},
  { path: "manuali", component: ManualiComponent},
  { path: "settori_operativi", component: SettoriOperativiComponent},
  { path: "software", component: SoftwareComponent},
  { path: "multimedia", component: MultimediaComponent},
  { path: "servizio_informatico", component: ServizioInformaticoComponent},
  { path: "lifm", component: LifmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
