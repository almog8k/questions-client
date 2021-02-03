import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID, SimpleChange } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartService } from '../services/chart.service';


@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {
  @Input("data") data: any;
  @Input("seriesData") seriesData: string[];
  
  private chart: am4charts.XYChart;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private chartsService: ChartService) { }

  ngOnInit(): void {

  }

  onToggleChange(switchValue: boolean) {
    this.chartsService.popularToggle.next(switchValue);
  }
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  createChart() {

    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data

      chart.data = this.data;


      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
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
        series.dataFields.categoryX = "category";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipHTML = `
  <center><strong>{categoryX}</strong></center>
  <hr>
  <table >
    <tr>
      <th align="left" style="color:orange">{name}</th>
      <td style="padding-left: 4em">{valueY} Questions</td>
    </tr>
  </table>  
  `
        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = 0.5;
        labelBullet.label.hideOversized = true;

        return series;
      }

      this.seriesData.forEach(hour => {
        createSeries(hour, hour);
      });

      // Legend
      chart.legend = new am4charts.Legend();
    });
  }
  ngOnChanges(changes: SimpleChange) {
    let data = changes['data'].currentValue;
    let seriesData = changes['seriesData'].currentValue;
    if(data && seriesData){
      this.createChart();
    }
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

