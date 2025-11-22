import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import * as bootstrap from 'bootstrap';
import { SubjectServiceService } from '../service/subject-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from '../confirm-dialog-component/confirm-dialog-component.component';
import { employeeForm } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-register-subject',
  templateUrl: './register-subject.component.html',
  styleUrls: ['./register-subject.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterSubjectComponent implements OnInit {
  constructor(
    private router: Router,
    private subjectService: SubjectServiceService,
    private dialog: MatDialog //  private ConfirmDialogComponent: ConfirmDialogComponentComponent
  ) {}
  calendarOptions: any;
  calendarEvents: any[] = [];
  subjectList: any = [];
  events: any = [];

  ngOnInit() {
    const monday = new Date('2025-11-03'); // Thứ 2
    const sunday = new Date('2025-11-09'); // Chủ nhật
    this.subjectService.getAllRegisterSubjectByUser('register').subscribe((data) => {
      this.calendarOptions.events = data;
      //  console.log()
      console.log('event:', this.calendarOptions.events);
    });

    this.calendarOptions = {
      initialView: 'timeGridWeek',
      expandRows: true, // 🔹 Tự giãn hàng để chứa nội dung
      slotEventOverlap: false, // 🔹 Không cho các event đè lên nhau
      eventMaxStack: 5, // (tùy chọn) số lượng event hiển thị chồng
      height: 'auto', // 🔹 Chiều cao tự động
      contentHeight: 'auto',

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
      dayHeaderContent: (arg: any) => {
        const thu = [
          'CN',
          'Thứ 2',
          'Thứ 3',
          'Thứ 4',
          'Thứ 5',
          'Thứ 6',
          'Thứ 7',
        ];
        return thu[arg.date.getDay()];
      },
      plugins: [timeGridPlugin, interactionPlugin],
      headerToolbar: false,
      firstDay: 1,

      initialDate: monday.toISOString().split('T')[0],
      validRange: {
        start: monday.toISOString().split('T')[0],
        end: new Date(sunday.getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      },
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
      events: this.events,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
    };
  }
  getAllRegister() {
    this.subjectService.getAllRegisterSubjectByUser('register').subscribe((data) => {
      return data;
    });
  }
  renderEventContent(arg: any) {
    const event = arg.event.extendedProps;
    return {
      html: `
      <div style="font-size:12px; line-height:1.4; padding:2px;">
        <b>${arg.event.title}</b><br>
        (${event.code})
        Phòng: ${event.roomName}<br>
        GV: ${event.teacherName}<br>
          Số SV: ${event.maxStudent}
      </div>
    `,
    };
  }
  deleteRegisterSubject: RegisterSubject = new RegisterSubject();
  // 👇 Hàm xử lý khi click vào event
  onEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event;
    let idSubject = event.id;
    const start = event.start?.toLocaleString();
    const end = event.end?.toLocaleString();

    // Hiển thị popup, hoặc log ra console
    if (confirm(`Bạn có muốn huỷ đăng kí môn học này ?`)) {
      console.log('oke');
      this.deleteRegisterSubject.id = Number(idSubject);
      this.subjectService
        .deleteRegisterSubject(this.deleteRegisterSubject)
        .subscribe((data) => {
          return data;
        });
      window.location.reload();

      // event.remove(); // xoá luôn event nếu người dùng xác nhận
    }
    console.log('oke');
  }

  // handleDateClick(arg: any) {
  //   const clicked = arg.date;
  //   const date = clicked.toISOString().split('T')[0]; // YYYY-MM-DD
  //   const hour = clicked.getHours();

  //   let slot = '';
  //   if (hour >= 7 && hour < 12) slot = 'Sáng';
  //   else if (hour >= 12 && hour < 17) slot = 'Chiều';

  //   console.log(`Ngày: ${date}`);
  //   console.log(`Giờ: ${hour}:00`);
  //   console.log(`Khung: ${slot}`);
  // }
  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  handleDateClick(arg: DateClickArg) {
    this.selectedDate = arg.date;
    this.selectedTime = arg.date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const clickedDate = new Date(arg.dateStr);

    // Lấy thứ trong tuần (0 = CN, 1 = Thứ 2, ..., 6 = Thứ 7)
    const dayOfWeek = clickedDate.getDay();

    // Map sang tên thứ tiếng Việt
    const weekdays = [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ];
    const thu = weekdays[dayOfWeek];
    const hour = clickedDate.getHours();
    let lessonStart;
    switch (hour) {
      case 7:
        lessonStart = 1;
        break;
      case 8:
        lessonStart = 2;
        break;
      case 9:
        lessonStart = 3;
        break;
      case 10:
        lessonStart = 4;
        break;
      case 11:
        lessonStart = 5;
        break;
      case 13:
        lessonStart = 6;
        break;
      case 16:
        lessonStart = 7;
        break;
      case 14:
        lessonStart = 8;
        break;
      case 15:
        lessonStart = 9;

        break;
      case 16:
        lessonStart = 10;
        break;
      default:
        lessonStart = 10;
        break;
    }
    this.subjectService
      .getAllRegisterSubject(thu, lessonStart)
      .subscribe((data) => {
        this.subjectList = data;
        console.log(this.subjectList);
      });

    console.log('Bạn đã click vào:', thu);
    // Mở modal khi click
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  addEmployeeForm: RegisterSubject = new RegisterSubject();
  registerSubject(subjectId: number) {
    this.addEmployeeForm.subjectId = subjectId;
    this.subjectService
      .registerSubject(this.addEmployeeForm)
      .subscribe((data) => {
        this.subjectList = data;
        console.log(this.subjectList);
      });
    this.subjectService.getAllRegisterSubjectByUser('register').subscribe((data) => {
      this.events = data;
      window.location.reload();
      console.log(this.subjectList);
    });

    // const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
    //   data: { message: `Bạn có chắc muốn xoá  không?` }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Gọi API xoá
    //    // this.apiService.deleteItem(itemId).subscribe(() => console.log('Đã xoá'));
    //   }
    // });
  }
}
export class RegisterSubject {
  subjectId: number = 0;
  id?: number;
}
