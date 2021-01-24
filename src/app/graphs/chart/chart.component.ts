import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { QuestionService } from 'src/app/services/question.service';
import { HttpResponse } from '@angular/common/http';
import { Question } from 'src/app/questions/models/question.model';
import { GraphsService } from '../services/graphs.service';
import { GraphQuestion } from '../models/graphQuestion.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent  implements OnInit {
  private chart: am4charts.XYChart;
  private questions: any;
  private  questionsDic: { [day: string]: Question } ;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, 
  private datePipe:DatePipe, private graphService: GraphsService) {}

  ngOnInit(){
this.graphService.graphQuestionsT.subscribe(
  (questions: { [day: string]: Question }) => {
    this.questionsDic = questions;
    console.log(this.questionsDic);
  }
)
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart);
        console.log(this.graphService.graphQuestionsT.subscribe(
          questionsT=> {
            this.questionsDic = questionsT
          }))
          console.log(this.questionsDic);
// Add data
chart.data = [{
  "day": "Sunday",
  "questionsCount": 10,
  "namerica": 2.5,
  "asia": 2.1,
  "lamerica": 0.3,
  "meast": 0.2,
  "africa": 0.1
}, {
  "day": "Monday",
  "questionsCount": .20,
  "namerica": 2.7,
  "asia": 2.2,
  "lamerica": 0.3,
  "meast": 0.3,
  "africa": 0.1
}, {
  "day": "Tuseday",
  "questionsCount": 5,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.3,
  "africa": 0.1
}, {
  "day": "Wednesday",
  "questionsCount": 30,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.3,
  "africa": 0.1
}, {
  "day": "Thursday",
  "questionsCount": 2,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.3,
  "africa": 0.1
}, {
  "day": "Friday",
  "questionsCount": 15,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.3,
  "africa": 0.1
}, {
  "day": "Saturday",
  "questionsCount": 100,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.3,
  "africa": 0.1
}
];

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "day";
categoryAxis.renderer.grid.template.location = 0;


let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.disabled = true;
valueAxis.min = 0;

// Create series
function createSeries(field, name) {
  
  // Set up series
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.name = name;
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "day";
  series.sequencedInterpolation = true;
  
  // Make it stacked
  series.stacked = true;
  
  // Configure columns
  series.columns.template.width = am4core.percent(60);
  series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
  
  // Add label
  let labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.text = "{valueY}";
  labelBullet.locationY = 0.5;
  labelBullet.label.hideOversized = true;
  
  return series;
}

createSeries("europe", "Europe");
createSeries("namerica", "North America");
createSeries("asia", "Asia-Pacific");
createSeries("lamerica", "Latin America");
createSeries("meast", "Middle-East");
createSeries("africa", "Africa");

// Legend
chart.legend = new am4charts.Legend();
    });
  }
  
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}