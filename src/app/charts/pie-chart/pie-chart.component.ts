import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
@Input() data : any[];
private chart: am4charts.PieChart;
constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, ) {}

ngOnInit(): void {
 
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

    // Create chart instance
let chart = am4core.create("piechartdiv", am4charts.PieChart);

// Add data
chart.data = this.data;

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "category";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;
  });
}

ngOnChanges() { 
  this.ngAfterViewInit(); 
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

