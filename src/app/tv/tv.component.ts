import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MockService } from '../providers/mock.service';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import api from '../api';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit, OnDestroy {
  @Input() symbol;

  tradingview;

  ws;
  wsMessage = 'you may need to send specific message to subscribe data, eg: BTC';

  granularityMap = {
    '1': 60,
    '3': 180,
    '5': 300,
    '30': 30 * 60,
    '60': 60 * 60,
    '120': 60 * 60 * 2,
    '240': 60 * 60 * 4,
    '360': 60 * 60 * 6,
    'D': 86400
  };

  constructor(private mockService: MockService) {
  }

  ngOnInit() {
    this.ws = this.mockService.fakeWebSocket();

    this.ws.onopen = () => {
      console.log('connect success');
      this.drawTv();
    };
  }

  ngOnDestroy() {
    this.ws.close();
  }

  public obj = {
    name: 'TVChartContainer',
    props: {
      symbol: {
        default: 'AAPL',
        type: String,
      },
      interval: {
        default: this.granularityMap,
        type: String,
      },
      containerId: {
        default: 'tradingview',
        type: String,
      },
      datafeedUrl: {
        default: 'https://demo_feed.tradingview.com',
        type: String,
      },
      libraryPath: {
        default: 'assets/vendors/charting_library/',
        type: String,
      },
      chartsStorageUrl: {
        default: 'https://saveload.tradingview.com',
        type: String,
      },
      chartsStorageApiVersion: {
        default: '1.2',
        type: String,
      },
      clientId: {
        default: 'tradingview.com',
        type: String,
      },
      userId: {
        default: 'public_user_id',
        type: String,
      },
      fullscreen: {
        default: false,
        type: Boolean,
      },
      autosize: {
        default: true,
        type: Boolean,
      },
      studiesOverrides: {
        type: Object,
      }
    }
  }



  drawTv() {
    const that = this;
    let _datafeedUrl = 'https://demo_feed.tradingview.com';

    let widgetOptions = {
      symbol: this.obj.props.symbol.default,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this.obj.props.datafeedUrl.default),
      interval: this.obj.props.interval.default,
      container_id: this.obj.props.containerId.default,
      library_path: this.obj.props.libraryPath.default,
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      // enabled_features: ['study_templates'],
      charts_storage_url: this.obj.props.chartsStorageUrl.default,
      charts_storage_api_version: this.obj.props.chartsStorageApiVersion.default,
      client_id: this.obj.props.clientId.default,
      user_id: this.obj.props.userId.default,
      fullscreen: this.obj.props.fullscreen.default,
      autosize: this.obj.props.autosize.default,
      studies_overrides: this.obj.props.studiesOverrides,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    this.tradingview = new (window as any).TradingView.widget(widgetOptions);

    this.tradingview.onChartReady(() => {
      /*
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () => tvWidget.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            // eslint-disable-next-line no-console
            console.log('Noticed!');
          },
        }));
        button.innerHTML = 'Check API';
      });
*/
    })

//     this.tradingview = new (window as any).TradingView.widget({
//       // debug: true, // uncomment this line to see Library errors and warnings in the console
//       fullscreen: true,
//       symbol: that.symbol,
//       interval: '1',
//       container_id: 'tradingview',
//       library_path: 'assets/vendors/charting_library/',
//       locale: 'en',
//       disabled_features: [
//         // 'timeframes_toolbar',
//         // 'go_to_date',
//         // 'use_localstorage_for_settings',
//         'volume_force_overlay',
//         // 'show_interval_dialog_on_key_press',
//         'symbol_search_hot_key',
//         'study_dialog_search_control',
//         'display_market_status',
//         /*'header_compare',
//         'header_symbol_search',
//         'header_fullscreen_button',
//         'header_settings',
//         'header_chart_type',
//         'header_resolutions',*/
//         'control_bar',
//         'edit_buttons_in_legend',
//         'border_around_the_chart',
//         'main_series_scale_menu',
//         'star_some_intervals_by_default',
//         'datasource_copypaste',
//         'header_indicators',
//         // 'context_menus',
//         // 'compare_symbol',
//         'header_undo_redo',
//         'border_around_the_chart',
//         'timezone_menu',
//         'remove_library_container_border',
//       ],
//       allow_symbol_change: true,
//       // enabled_features: ['study_templates'],
//       // charts_storage_url: 'http://saveload.tradingview.com',
//       charts_storage_api_version: '1.1',
//       client_id: 'tradingview.com',
//       user_id: 'public_user_id',
//       timezone: 'America/New_York',
//       volumePaneSize: 'tiny',
      
//         //    datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(_datafeedUrl)
// datafeed:api
//     });
    
  }
}
