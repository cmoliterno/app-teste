import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // configurando as coisas dos graficos (cor,tipo, oq de data vai puxar)
  public chartData: ChartDataSets[] = [{data: [], label: 'valor da ação'}];
  public chartType: ChartType = 'line';
  public chartLabels: Label[]; 
  public chartColors: Color[] = [{backgroundColor: '#fff000', borderColor: '#ffffff' , borderWidth: 1}]
  public chartLegend: boolean = true;

  // vai ser para fazer as buscas 
  public sticker: string;

  constructor(private httpClient: HttpClient) { }
    // this.loadData(); vai carregar automaticamente 
    // }

  // carregar a api do site (tendo a chave de acesso/ qual a marca e sua data de inicio e fim)
  // STCKER É PODER PESQUISAR VARIOS, se não deixa apenas um no lugar de sticker
  loadData() {
    const request: string = `http://api.marketstack.com/v1/eod?access_key=f1d1938e6993ae0ab8cdfd5c50b69a03&symbols=${this.sticker}&date_from=2020-06-25&date_to=2020-07-25`;

    this.httpClient.get(request).subscribe(res =>{
      const data: any = (res as any).data;

      // definindo os arrays 
      this.chartLabels = [];
      this.chartData[0].data = [];

      for (let i =0; i < data.length; i++) {
        const date: Date = new Date(data[i].date);

        // foi adicionado mais 1 no mes para não começar com 0-11 e é com esse push que vai do array que vai pegar as infos 
        this.chartLabels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
        this.chartData[0].data.push(data[i].close);
      }
    });  
  }

}
