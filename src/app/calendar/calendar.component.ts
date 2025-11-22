import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebApiService } from '../service/web-api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { SubjectServiceService } from '../service/subject-service.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  constructor(
    public webApiService: WebApiService,
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService,
    private subjectService: SubjectServiceService
  ) {}

  ngOnInit(): void {
    //  const monday = new Date('2025-11-03'); // Thứ 2
    // const sunday = new Date('2025-11-09'); // Chủ nhật
    this.subjectService.getAllRegisterSubjectByUser("calendar").subscribe((data) => {
      this.calendarOptions.events = data;
      //  console.log()
      // console.log('event:', this.calendarOptions.events);
    });

    this.calendarOptions = {
      initialView: 'timeGridWeek',
      expandRows: true, // 🔹 Tự giãn hàng để chứa nội dung
      slotEventOverlap: false, // 🔹 Không cho các event đè lên nhau
      // eventMaxStack: 5, // (tùy chọn) số lượng event hiển thị chồng
      height: 'auto', // 🔹 Chiều cao tự động
      contentHeight: 'auto',
      headerToolbar: {
        left: 'prev,next today', // 🔥 Nút chuyển tuần
        center: 'title', // 🔥 Hiển thị ngày trong tuần
        right: '',
      },
      dayHeaderContent: (arg: any) => {
        const days = ['CN', ' T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const date = arg.date;
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return { html: `${dayName} (${day}/${month})` };
      },

      // titleFormat: {
      //   month: 'numeric',
      //   day: 'numeric'
      // },

      slotLabelContent: (arg: { date: { getHours: () => number } }) => {
        if (arg.date.getHours() === 7) return { html: 'Tiết 1' };
        if (arg.date.getHours() === 8) return { html: 'Tiết 2' };
        if (arg.date.getHours() === 9) return { html: 'Tiết 3' };
        if (arg.date.getHours() === 10) return { html: 'Tiết 4' };
        if (arg.date.getHours() === 11) return { html: 'Tiết 5' };
        if (arg.date.getHours() === 12) return { html: 'Giờ Nghỉ' };
        if (arg.date.getHours() === 13) return { html: 'Tiết 6' };
        if (arg.date.getHours() === 14) return { html: 'Tiết 7' };
        if (arg.date.getHours() === 15) return { html: 'Tiết 8' };
        if (arg.date.getHours() === 16) return { html: 'Tiết 9' };
        if (arg.date.getHours() === 17) return { html: 'Tiết 10' };
        // if (arg.date.getHours() === 7) return { html: 'Tiết 1' };
        // if (arg.date.getHours() === 7) return { html: 'Tiết 1' };
        // if (arg.date.getHours() === 12) return { html: 'Chiều' };
        return { html: '' };
      },
      // dayHeaderContent: (arg: any) => {
      //   const thu = [
      //     'CN',
      //     'Thứ 2',
      //     'Thứ 3',
      //     'Thứ 4',
      //     'Thứ 5',
      //     'Thứ 6',
      //     'Thứ 7',
      //   ];
      //   return thu[arg.date.getDay()];
      // },
      plugins: [timeGridPlugin, interactionPlugin],
      // headerToolbar: false,
      firstDay: 1,

      // initialDate: monday.toISOString().split('T')[0],
      // validRange: {
      //   start: monday.toISOString().split('T')[0],
      //   end: new Date(sunday.getTime() + 24 * 60 * 60 * 1000)
      //     .toISOString()
      //     .split('T')[0],
      // },
      allDaySlot: false,
      weekends: true,
      dayHeaderFormat: { weekday: 'long' },
      locale: 'vi',
      slotMinTime: '07:00:00',
      slotMaxTime: '18:00:00',
      slotDuration: '01:00:00', // 07:00-12:00 = Sáng, 12:00-17:00 = Chiều
      // slotLabelInterval: '05:00',
      eventContent: this.renderEventContent.bind(this),
      // events: [
      //   {
      //     title: 'Nhập môn trí tuệ nhân tạo',
      //     code: 'INT1341',
      //     group: 'VH11',
      //     room: '302-LK-302-A (Cơ sở liên kết)',
      //     teacher: 'Đào Thị Thúy Quỳnh',
      //     daysOfWeek: [2], // Thứ 3
      //     startTime: '08:00:00',
      //     endTime: '10:00:00',
      //     color: '#f8d7da', // màu nền
      //     borderColor: '#dc3545', // viền đỏ
      //     textColor: '#000',
      //   },
      // ],
      events: [
        {
          title: 'Toan',
          code: 'OanhKute',
          maxStudent: '20/25',
          roomName: null,
          teacherName: null,
          daysOfWeek: [2],
          startTime: '07:00:00',
          endTime: '11:00:00',
          startRecur: '2025-11-03', // Bắt đầu từ tuần 03/11
          endRecur: '2025-11-24',
        },
      ],
      // dateClick: this.handleDateClick.bind(this),
      // eventClick: this.onEventClick.bind(this),
    };
  }

  renderEventContent(arg: any) {
    const event = arg.event.extendedProps;
    return {
      html: `
      <div style="font-size:12px; line-height:1.4; padding:2px;">
        <b>${arg.event.title}</b><br>
        (${event.code})<br>
        Phòng: ${event.roomName}<br>
        GV: ${event.teacherName}<br>
        Số SV: ${event.maxStudent}
      </div>
    `,
    };
  }

  generateWeeklyEvents(
    startDateStr: string,
    endDateStr: string,
    timeStr: string
  ) {
    const events: any[] = [];
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const [hours, minutes] = timeStr.split(':').map(Number);
    const current = new Date(startDate);
    current.setHours(hours, minutes, 0, 0);
    console.log('current:', current);
    const local = new Date(
      current.getTime() - current.getTimezoneOffset() * 60000
    );
    while (local <= endDate) {
      events.push({
        title: 'Sự kiện hàng tuần',
        start: local.toISOString().slice(0, 16),
      });
      local.setDate(local.getDate() + 7);
    }

    return events;
  }
}
