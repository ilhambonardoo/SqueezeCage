import {
  HelpCircle,
  MessageSquare,
  ShieldAlert,
  Cpu,
  CpuIcon,
  MonitorCloud,
} from "lucide-react";
import { GiCow } from "react-icons/gi";

export const faqData = [
  {
    id: 1,
    category: "Umum",
    icon: HelpCircle,
    question: "Apa fungsi utama dari SmartSqueeze Cage?",
    answer:
      "Smart Squeeze Cage merupakan pengembangan kandang jepit konvensional yang diintegrasikan dengan teknologi Internet of Things untuk mendukung proses penimbangan ternak secara otomatis. Sistem ini menggabungkan komponen mekanik dan elektronik berupa load cell, HX711, ESP32, database cloud, dan dashboard monitoring sehingga mampu melakukan pengukuran, penyimpanan, serta pengolahan data berat badan ternak secara realtime.",
  },
  {
    id: 2,
    category: "Aman",
    icon: ShieldAlert,
    question:
      "Apakah mekanisme jepitan (Squeeze) aman dan tidak menyakiti hewan?",
    answer:
      "Sangat aman. Sistem mekanisme pada kandang kambing ini tidak memiliki benda yang tajam untuk menyakiti hewan. Kerangka sudah sangat kokoh dan tidak mudah patah jika kambing mengamuk atau stress.",
  },
  {
    id: 3,
    category: "Hardware",
    icon: Cpu,
    question:
      "Bagaimana jika koneksi Wi-Fi atau listrik di area peternakan terputus?",
    answer:
      "Tidak masalah. Smart Squeezecage ini memiliki komponen perangkat keras bernama LCD ILI9341 yang tidak wajib dihubungkan ke internet. Jika ingin melihat dari dashboard web harus terhubung ke internet. ",
  },
  {
    id: 4,
    category: "Software",
    icon: MessageSquare,
    question: "Bagaimana cara membuat akun untuk platform ini?",
    answer:
      "Hubungi kontak Whatsapp yang tertera di bagian bawah halaman. Kontak yang lengkap ada dipanduan bagian Layanan Bantuan (Customer Support)",
  },
  {
    id: 5,
    category: "Hardware",
    icon: CpuIcon,
    question: "Apakah besi ini bisa dibongkar pasang?",
    answer:
      "Sangat bisa. Kerangka besi bisa dibongkar pasang dan flexibel untuk dibawa kemana-mana. Tidak hanya itu, jika Sensor Loadcell mengalami kerusakan. Maka loadcell tersebut bisa dibongkar kemudian bisa digantikan ke loadcell yang baru.",
  },
  {
    id: 6,
    category: "Hardware",
    icon: GiCow,
    question: "Maksimal berat untuk sensor loadcell berapa?",
    answer: "Maksimal berat untuk sensor loadcell HX711 yaitu 200 KG",
  },
  {
    id: 7,
    category: "Software",
    icon: MonitorCloud,
    question: "Berapa lama untuk mengisi baterai pada alat Smart SqueezeCage?",
    answer: "2 Jam sampai 3 Jam",
  },
];
