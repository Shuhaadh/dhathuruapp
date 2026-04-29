// Complete island database matching MapView.tsx coordinates
export interface Island {
  code: string;
  name: string;
  fullName: string; // Must match MapView.tsx coordinates exactly
  atollName: string;
  type: 'inhabited' | 'resort';
}

export const ATOLLS = [
  { code: 'K', name: 'Kaafu', fullName: 'Kaafu Atoll' },
  { code: 'Ha', name: 'Haa Alif', fullName: 'Haa Alif Atoll' },
  { code: 'Hdh', name: 'Haa Dhaalu', fullName: 'Haa Dhaalu Atoll' },
  { code: 'Sh', name: 'Shaviyani', fullName: 'Shaviyani Atoll' },
  { code: 'N', name: 'Noonu', fullName: 'Noonu Atoll' },
  { code: 'R', name: 'Raa', fullName: 'Raa Atoll' },
  { code: 'B', name: 'Baa', fullName: 'Baa Atoll' },
  { code: 'Lh', name: 'Lhaviyani', fullName: 'Lhaviyani Atoll' },
  { code: 'AA', name: 'Alif Alif', fullName: 'North Ari Atoll' },
  { code: 'ADh', name: 'Alif Dhaal', fullName: 'South Ari Atoll' },
  { code: 'V', name: 'Vaavu', fullName: 'Vaavu Atoll' },
  { code: 'M', name: 'Meemu', fullName: 'Meemu Atoll' },
  { code: 'F', name: 'Faafu', fullName: 'Faafu Atoll' },
  { code: 'Dh', name: 'Dhaalu', fullName: 'Dhaalu Atoll' },
  { code: 'Th', name: 'Thaa', fullName: 'Thaa Atoll' },
  { code: 'L', name: 'Laamu', fullName: 'Laamu Atoll' },
  { code: 'GA', name: 'Gaafu Alif', fullName: 'North Huvadhu Atoll' },
  { code: 'GDh', name: 'Gaafu Dhaalu', fullName: 'South Huvadhu Atoll' },
  { code: 'Gn', name: 'Gnaviyani', fullName: 'Fuvahmulah Atoll' },
  { code: 'S', name: 'Seenu', fullName: 'Addu Atoll' },
];

export const ISLANDS: Island[] = [
  // ===== MAJOR HUBS =====
  { code: 'MALE', name: 'Male', fullName: 'Male City', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'HULHUMALE', name: 'Hulhumale', fullName: 'Hulhumale', atollName: 'Kaafu Atoll', type: 'inhabited' },
  
  // ===== NOONU ATOLL (ALL 13 INHABITED ISLANDS) =====
  { code: 'N-LHOHI', name: 'Lhohi', fullName: 'N. Lhohi', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-VELIDHOO', name: 'Velidhoo', fullName: 'N. Velidhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-MANADHOO', name: 'Manadhoo', fullName: 'N. Manadhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-LANDHOO', name: 'Landhoo', fullName: 'N. Landhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-MAAFARU', name: 'Maafaru', fullName: 'N. Maafaru', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-KENDHIKOLHUDHOO', name: 'Kendhikolhudhoo', fullName: 'N. Kendhikolhudhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-MAGOODHOO', name: 'Magoodhoo', fullName: 'N. Magoodhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-HENBANDHOO', name: 'Henbandhoo', fullName: 'N. Henbandhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-KUDAFARI', name: 'Kudafari', fullName: 'N. Kudafari', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-FODHDHOO', name: 'Fodhdhoo', fullName: 'N. Fodhdhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-MILADHOO', name: 'Miladhoo', fullName: 'N. Miladhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-HOLHUDHOO', name: 'Holhudhoo', fullName: 'N. Holhudhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  { code: 'N-MAALHENDHOO', name: 'Maalhendhoo', fullName: 'N. Maalhendhoo', atollName: 'Noonu Atoll', type: 'inhabited' },
  
  // ===== KAAFU ATOLL (INHABITED ISLANDS) =====
  { code: 'K-MAAFUSHI', name: 'Maafushi', fullName: 'K. Maafushi', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-THULUSDHOO', name: 'Thulusdhoo', fullName: 'K. Thulusdhoo', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-VILLINGILI', name: 'Villingili', fullName: 'K. Villingili', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-GULHI', name: 'Gulhi', fullName: 'K. Gulhi', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-HURAA', name: 'Huraa', fullName: 'K. Huraa', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-HIMMAFUSHI', name: 'Himmafushi', fullName: 'K. Himmafushi', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-DHIFFUSHI', name: 'Dhiffushi', fullName: 'K. Dhiffushi', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-GURAIDHOO', name: 'Guraidhoo', fullName: 'K. Guraidhoo', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-GAAFARU', name: 'Gaafaru', fullName: 'K. Gaafaru', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-GIRIFUSHI', name: 'Girifushi', fullName: 'K. Girifushi', atollName: 'Kaafu Atoll', type: 'inhabited' },
  { code: 'K-KAASHIDHOO', name: 'Kaashidhoo', fullName: 'K. Kaashidhoo', atollName: 'Kaafu Atoll', type: 'inhabited' },
  
  // KAAFU ATOLL (RESORTS)
  { code: 'K-BANDOS', name: 'Bandos', fullName: 'K. Bandos', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-KURUMBA', name: 'Kurumba', fullName: 'K. Kurumba', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-FULLMOON', name: 'Full Moon', fullName: 'K. Full Moon', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-PARADISE', name: 'Paradise Island', fullName: 'K. Paradise Island', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-BAROS', name: 'Baros', fullName: 'K. Baros', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-COCOA', name: 'Cocoa Island', fullName: 'K. Cocoa Island', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-TAJEXOTICA', name: 'Taj Exotica', fullName: 'K. Taj Exotica', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-VELASSARU', name: 'Velassaru', fullName: 'K. Velassaru', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-ANANTARA-VELI', name: 'Anantara Veli', fullName: 'K. Anantara Veli', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-ANANTARA-DHIGU', name: 'Anantara Dhigu', fullName: 'K. Anantara Dhigu', atollName: 'Kaafu Atoll', type: 'resort' },
  { code: 'K-FOURSEASONS', name: 'Four Seasons Kuda Huraa', fullName: 'K. Four Seasons Kuda Huraa', atollName: 'Kaafu Atoll', type: 'resort' },
  
  // ===== HAA ALIF ATOLL =====
  { code: 'HA-DHIDHDHOO', name: 'Dhidhdhoo', fullName: 'Ha. Dhidhdhoo', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-HOARAFUSHI', name: 'Hoarafushi', fullName: 'Ha. Hoarafushi', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-IHAVANDHOO', name: 'Ihavandhoo', fullName: 'Ha. Ihavandhoo', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-KELAA', name: 'Kelaa', fullName: 'Ha. Kelaa', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-VASHAFARU', name: 'Vashafaru', fullName: 'Ha. Vashafaru', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-BAARAH', name: 'Baarah', fullName: 'Ha. Baarah', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-FILLADHOO', name: 'Filladhoo', fullName: 'Ha. Filladhoo', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-ULIGAMU', name: 'Uligamu', fullName: 'Ha. Uligamu', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-MULHADHOO', name: 'Mulhadhoo', fullName: 'Ha. Mulhadhoo', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-MURAIDHOO', name: 'Muraidhoo', fullName: 'Ha. Muraidhoo', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-THAKANDHOO', name: 'Thakandhoo', fullName: 'Ha. Thakandhoo', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-MOLHADHOO', name: 'Molhadhoo', fullName: 'Ha. Molhadhoo', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  { code: 'HA-UTHEEM', name: 'Utheem', fullName: 'Ha. Utheem', atollName: 'Haa Alif Atoll', type: 'inhabited' },
  
  // ===== HAA DHAALU ATOLL =====
  { code: 'HDH-KULHUDHUFFUSHI', name: 'Kulhudhuffushi', fullName: 'Hdh. Kulhudhuffushi', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-NOLHIVARAN', name: 'Nolhivaran', fullName: 'Hdh. Nolhivaran', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-HANIMAADHOO', name: 'Hanimaadhoo', fullName: 'Hdh. Hanimaadhoo', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-NELLAIDHOO', name: 'Nellaidhoo', fullName: 'Hdh. Nellaidhoo', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-KUMUNDHOO', name: 'Kumundhoo', fullName: 'Hdh. Kumundhoo', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-NOLHIVARANFARU', name: 'Nolhivaranfaru', fullName: 'Hdh. Nolhivaranfaru', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-FINEY', name: 'Finey', fullName: 'Hdh. Finey', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-MAKUNUDHOO', name: 'Makunudhoo', fullName: 'Hdh. Makunudhoo', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-VAIKARADHOO', name: 'Vaikaradhoo', fullName: 'Hdh. Vaikaradhoo', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-NEYKURENDHOO', name: 'Neykurendhoo', fullName: 'Hdh. Neykurendhoo', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  { code: 'HDH-NAIVAADHOO', name: 'Naivaadhoo', fullName: 'Hdh. Naivaadhoo', atollName: 'Haa Dhaalu Atoll', type: 'inhabited' },
  
  // ===== SHAVIYANI ATOLL =====
  { code: 'SH-FUNADHOO', name: 'Funadhoo', fullName: 'Sh. Funadhoo', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-MILANDHOO', name: 'Milandhoo', fullName: 'Sh. Milandhoo', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-KOMANDOO', name: 'Komandoo', fullName: 'Sh. Komandoo', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-NARUDHOO', name: 'Narudhoo', fullName: 'Sh. Narudhoo', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-GOIDHOO', name: 'Goidhoo', fullName: 'Sh. Goidhoo', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-FEEVAH', name: 'Feevah', fullName: 'Sh. Feevah', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-MAROSHI', name: 'Maroshi', fullName: 'Sh. Maroshi', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-BILEFFAHI', name: 'Bileffahi', fullName: 'Sh. Bileffahi', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-KANDITHEEMU', name: 'Kanditheemu', fullName: 'Sh. Kanditheemu', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-FOAKAIDHOO', name: 'Foakaidhoo', fullName: 'Sh. Foakaidhoo', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-LHAIMAGU', name: 'Lhaimagu', fullName: 'Sh. Lhaimagu', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-MAAUNGOODHOO', name: 'Maaungoodhoo', fullName: 'Sh. Maaungoodhoo', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  { code: 'SH-NOOMARAA', name: 'Noomaraa', fullName: 'Sh. Noomaraa', atollName: 'Shaviyani Atoll', type: 'inhabited' },
  
  // ===== RAA ATOLL =====
  { code: 'R-UNGOOFAARU', name: 'Ungoofaaru', fullName: 'R. Ungoofaaru', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-MEEDHOO', name: 'Meedhoo', fullName: 'R. Meedhoo', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-INNAMAADHOO', name: 'Innamaadhoo', fullName: 'R. Innamaadhoo', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-ANGOLHITHEEMU', name: 'Angolhitheemu', fullName: 'R. Angolhitheemu', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-KINOLHAS', name: 'Kinolhas', fullName: 'R. Kinolhas', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-ALIFUSHI', name: 'Alifushi', fullName: 'R. Alifushi', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-RASGETHEEMU', name: 'Rasgetheemu', fullName: 'R. Rasgetheemu', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-HULHUDHUFFAARU', name: 'Hulhudhuffaaru', fullName: 'R. Hulhudhuffaaru', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-KANDHOLHUDHOO', name: 'Kandholhudhoo', fullName: 'R. Kandholhudhoo', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-MAAKURATHU', name: 'Maakurathu', fullName: 'R. Maakurathu', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-MADUVVARI', name: 'Maduvvari', fullName: 'R. Maduvvari', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-RASMAADHOO', name: 'Rasmaadhoo', fullName: 'R. Rasmaadhoo', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-DHUVAAFARU', name: 'Dhuvaafaru', fullName: 'R. Dhuvaafaru', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-VAADHOO', name: 'Vaadhoo', fullName: 'R. Vaadhoo', atollName: 'Raa Atoll', type: 'inhabited' },
  { code: 'R-FAINU', name: 'Fainu', fullName: 'R. Fainu', atollName: 'Raa Atoll', type: 'inhabited' },
  
  // ===== BAA ATOLL =====
  { code: 'B-EYDHAFUSHI', name: 'Eydhafushi', fullName: 'B. Eydhafushi', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-DHARAVANDHOO', name: 'Dharavandhoo', fullName: 'B. Dharavandhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-KAMADHOO', name: 'Kamadhoo', fullName: 'B. Kamadhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-KENDHOO', name: 'Kendhoo', fullName: 'B. Kendhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-KIHAADHOO', name: 'Kihaadhoo', fullName: 'B. Kihaadhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-KUDARIKILU', name: 'Kudarikilu', fullName: 'B. Kudarikilu', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-MAALHOS', name: 'Maalhos', fullName: 'B. Maalhos', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-THULHAADHOO', name: 'Thulhaadhoo', fullName: 'B. Thulhaadhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-GOIDHOO', name: 'Goidhoo', fullName: 'B. Goidhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-FULHADHOO', name: 'Fulhadhoo', fullName: 'B. Fulhadhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-FEHENDHOO', name: 'Fehendhoo', fullName: 'B. Fehendhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-HITHAADHOO', name: 'Hithaadhoo', fullName: 'B. Hithaadhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-DHONFANU', name: 'Dhonfanu', fullName: 'B. Dhonfanu', atollName: 'Baa Atoll', type: 'inhabited' },
  { code: 'B-HIBALHIDHOO', name: 'Hibalhidhoo', fullName: 'B. Hibalhidhoo', atollName: 'Baa Atoll', type: 'inhabited' },
  
 
  { code: 'LH-NAIFARU', name: 'Naifaru', fullName: 'Lh. Naifaru', atollName: 'Lhaviyani Atoll', type: 'inhabited' },
  { code: 'LH-HINNAVARU', name: 'Hinnavaru', fullName: 'Lh. Hinnavaru', atollName: 'Lhaviyani Atoll', type: 'inhabited' },
  { code: 'LH-KURENDHOO', name: 'Kurendhoo', fullName: 'Lh. Kurendhoo', atollName: 'Lhaviyani Atoll', type: 'inhabited' },
  { code: 'LH-OLHUVELIFUSHI', name: 'Olhuvelifushi', fullName: 'Lh. Olhuvelifushi', atollName: 'Lhaviyani Atoll', type: 'inhabited' },
  { code: 'LH-FELIVARU', name: 'Felivaru', fullName: 'Lh. Felivaru', atollName: 'Lhaviyani Atoll', type: 'inhabited' },
  
  
  { code: 'AA-RASDHOO', name: 'Rasdhoo', fullName: 'AA. Rasdhoo', atollName: 'North Ari Atoll', type: 'inhabited' },
  { code: 'AA-THODDOO', name: 'Thoddoo', fullName: 'AA. Thoddoo', atollName: 'North Ari Atoll', type: 'inhabited' },
  { code: 'AA-UKULHAS', name: 'Ukulhas', fullName: 'AA. Ukulhas', atollName: 'North Ari Atoll', type: 'inhabited' },
  { code: 'AA-BODUFOLHUDHOO', name: 'Bodufolhudhoo', fullName: 'AA. Bodufolhudhoo', atollName: 'North Ari Atoll', type: 'inhabited' },
  { code: 'AA-MATHIVERI', name: 'Mathiveri', fullName: 'AA. Mathiveri', atollName: 'North Ari Atoll', type: 'inhabited' },
  { code: 'AA-HIMANDHOO', name: 'Himandhoo', fullName: 'AA. Himandhoo', atollName: 'North Ari Atoll', type: 'inhabited' },
  { code: 'AA-MAALHOS', name: 'Maalhos', fullName: 'AA. Maalhos', atollName: 'North Ari Atoll', type: 'inhabited' },
  { code: 'AA-FERIDHOO', name: 'Feridhoo', fullName: 'AA. Feridhoo', atollName: 'North Ari Atoll', type: 'inhabited' },
  
  
  { code: 'ADH-MAHIBADHOO', name: 'Mahibadhoo', fullName: 'ADh. Mahibadhoo', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-KUNBURUDHOO', name: 'Kunburudhoo', fullName: 'ADh. Kunburudhoo', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-DHANGETHI', name: 'Dhangethi', fullName: 'ADh. Dhangethi', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-DHIGURAH', name: 'Dhigurah', fullName: 'ADh. Dhigurah', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-OMADHOO', name: 'Omadhoo', fullName: 'ADh. Omadhoo', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-MANDHOO', name: 'Mandhoo', fullName: 'ADh. Mandhoo', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-DHIDHDHOO', name: 'Dhidhdhoo', fullName: 'ADh. Dhidhdhoo', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-FENFUSHI', name: 'Fenfushi', fullName: 'ADh. Fenfushi', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-HANGNAMEEDHOO', name: 'Hangnameedhoo', fullName: 'ADh. Hangnameedhoo', atollName: 'South Ari Atoll', type: 'inhabited' },
  { code: 'ADH-MAAMIGILI', name: 'Maamigili', fullName: 'ADh. Maamigili', atollName: 'South Ari Atoll', type: 'inhabited' },
  
  
  { code: 'V-FELIDHOO', name: 'Felidhoo', fullName: 'V. Felidhoo', atollName: 'Vaavu Atoll', type: 'inhabited' },
  { code: 'V-KEYODHOO', name: 'Keyodhoo', fullName: 'V. Keyodhoo', atollName: 'Vaavu Atoll', type: 'inhabited' },
  { code: 'V-THINADHOO', name: 'Thinadhoo', fullName: 'V. Thinadhoo', atollName: 'Vaavu Atoll', type: 'inhabited' },
  { code: 'V-RAKEEDHOO', name: 'Rakeedhoo', fullName: 'V. Rakeedhoo', atollName: 'Vaavu Atoll', type: 'inhabited' },
  { code: 'V-FULIDHOO', name: 'Fulidhoo', fullName: 'V. Fulidhoo', atollName: 'Vaavu Atoll', type: 'inhabited' },
  
  
  { code: 'M-MULI', name: 'Muli', fullName: 'M. Muli', atollName: 'Meemu Atoll', type: 'inhabited' },
  { code: 'M-NAALAAFUSHI', name: 'Naalaafushi', fullName: 'M. Naalaafushi', atollName: 'Meemu Atoll', type: 'inhabited' },
  { code: 'M-DHIGGARU', name: 'Dhiggaru', fullName: 'M. Dhiggaru', atollName: 'Meemu Atoll', type: 'inhabited' },
  { code: 'M-MULAKU', name: 'Mulaku', fullName: 'M. Mulaku', atollName: 'Meemu Atoll', type: 'inhabited' },
  { code: 'M-VEYVAH', name: 'Veyvah', fullName: 'M. Veyvah', atollName: 'Meemu Atoll', type: 'inhabited' },
  { code: 'M-KOLHUFUSHI', name: 'Kolhufushi', fullName: 'M. Kolhufushi', atollName: 'Meemu Atoll', type: 'inhabited' },
  { code: 'M-MADIFUSHI', name: 'Madifushi', fullName: 'M. Madifushi', atollName: 'Meemu Atoll', type: 'inhabited' },
  { code: 'M-RAIYMANDHOO', name: 'Raiymandhoo', fullName: 'M. Raiymandhoo', atollName: 'Meemu Atoll', type: 'inhabited' },
  
  // ===== FAAFU ATOLL =====
  { code: 'F-NILANDHOO', name: 'Nilandhoo', fullName: 'F. Nilandhoo', atollName: 'Faafu Atoll', type: 'inhabited' },
  { code: 'F-MAGOODHOO', name: 'Magoodhoo', fullName: 'F. Magoodhoo', atollName: 'Faafu Atoll', type: 'inhabited' },
  { code: 'F-FEEALI', name: 'Feeali', fullName: 'F. Feeali', atollName: 'Faafu Atoll', type: 'inhabited' },
  { code: 'F-DHARANBOODHOO', name: 'Dharanboodhoo', fullName: 'F. Dharanboodhoo', atollName: 'Faafu Atoll', type: 'inhabited' },
  { code: 'F-BILEDHDHOO', name: 'Biledhdhoo', fullName: 'F. Biledhdhoo', atollName: 'Faafu Atoll', type: 'inhabited' },
  
  // ===== DHAALU ATOLL =====
  { code: 'DH-KUDAHUVADHOO', name: 'Kudahuvadhoo', fullName: 'Dh. Kudahuvadhoo', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  { code: 'DH-MEEDHOO', name: 'Meedhoo', fullName: 'Dh. Meedhoo', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  { code: 'DH-BANDIDHOO', name: 'Bandidhoo', fullName: 'Dh. Bandidhoo', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  { code: 'DH-RINBIDHOO', name: 'Rinbidhoo', fullName: 'Dh. Rinbidhoo', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  { code: 'DH-HULHUDHELI', name: 'Hulhudheli', fullName: 'Dh. Hulhudheli', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  { code: 'DH-GEMENDHOO', name: 'Gemendhoo', fullName: 'Dh. Gemendhoo', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  { code: 'DH-VAANEE', name: 'Vaanee', fullName: 'Dh. Vaanee', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  { code: 'DH-MAAENBOODHOO', name: 'Maaenboodhoo', fullName: 'Dh. Maaenboodhoo', atollName: 'Dhaalu Atoll', type: 'inhabited' },
  
  // ===== THAA ATOLL =====
  { code: 'TH-VEYMANDOO', name: 'Veymandoo', fullName: 'Th. Veymandoo', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-THIMARAFUSHI', name: 'Thimarafushi', fullName: 'Th. Thimarafushi', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-DHIYAMINGILI', name: 'Dhiyamingili', fullName: 'Th. Dhiyamingili', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-BURUNI', name: 'Buruni', fullName: 'Th. Buruni', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-GAADHIFFUSHI', name: 'Gaadhiffushi', fullName: 'Th. Gaadhiffushi', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-GURAIDHOO', name: 'Guraidhoo', fullName: 'Th. Guraidhoo', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-HIRILANDHOO', name: 'Hirilandhoo', fullName: 'Th. Hirilandhoo', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-KANDOODHOO', name: 'Kandoodhoo', fullName: 'Th. Kandoodhoo', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-KINBIDHOO', name: 'Kinbidhoo', fullName: 'Th. Kinbidhoo', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-MADIFUSHI', name: 'Madifushi', fullName: 'Th. Madifushi', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-OMADHOO', name: 'Omadhoo', fullName: 'Th. Omadhoo', atollName: 'Thaa Atoll', type: 'inhabited' },
  { code: 'TH-VANDHOO', name: 'Vandhoo', fullName: 'Th. Vandhoo', atollName: 'Thaa Atoll', type: 'inhabited' },
  
  // ===== LAAMU ATOLL =====
  { code: 'L-GAN', name: 'Gan', fullName: 'L. Gan', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-FONADHOO', name: 'Fonadhoo', fullName: 'L. Fonadhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-ISDHOO', name: 'Isdhoo', fullName: 'L. Isdhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-KALAIDHOO', name: 'Kalaidhoo', fullName: 'L. Kalaidhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-MAAMENDHOO', name: 'Maamendhoo', fullName: 'L. Maamendhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-MAAVAH', name: 'Maavah', fullName: 'L. Maavah', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-MUNDOO', name: 'Mundoo', fullName: 'L. Mundoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-HITHADHOO', name: 'Hithadhoo', fullName: 'L. Hithadhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-KUNAHANDHOO', name: 'Kunahandhoo', fullName: 'L. Kunahandhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-DHANBIDHOO', name: 'Dhanbidhoo', fullName: 'L. Dhanbidhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  { code: 'L-GAADHOO', name: 'Gaadhoo', fullName: 'L. Gaadhoo', atollName: 'Laamu Atoll', type: 'inhabited' },
  
  // ===== GAAFU ALIF ATOLL =====
  { code: 'GA-VILLINGILI', name: 'Villingili', fullName: 'GA. Villingili', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-KOLAMAAFUSHI', name: 'Kolamaafushi', fullName: 'GA. Kolamaafushi', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-NILANDHOO', name: 'Nilandhoo', fullName: 'GA. Nilandhoo', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-DHAANDHOO', name: 'Dhaandhoo', fullName: 'GA. Dhaandhoo', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-DHEVVADHOO', name: 'Dhevvadhoo', fullName: 'GA. Dhevvadhoo', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-GEMANAFUSHI', name: 'Gemanafushi', fullName: 'GA. Gemanafushi', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-KANDUHULHUDHOO', name: 'Kanduhulhudhoo', fullName: 'GA. Kanduhulhudhoo', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-MAAMENDHOO', name: 'Maamendhoo', fullName: 'GA. Maamendhoo', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  { code: 'GA-KONDEY', name: 'Kondey', fullName: 'GA. Kondey', atollName: 'North Huvadhu Atoll', type: 'inhabited' },
  
  // ===== GAAFU DHAALU ATOLL =====
  { code: 'GDH-THINADHOO', name: 'Thinadhoo', fullName: 'GDh. Thinadhoo', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-GADHDHOO', name: 'Gadhdhoo', fullName: 'GDh. Gadhdhoo', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-MADAVELI', name: 'Madaveli', fullName: 'GDh. Madaveli', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-NADELLAA', name: 'Nadellaa', fullName: 'GDh. Nadellaa', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-VAADHOO', name: 'Vaadhoo', fullName: 'GDh. Vaadhoo', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-FIYOAREE', name: 'Fiyoaree', fullName: 'GDh. Fiyoaree', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-FARESMAATHODAA', name: 'Faresmaathodaa', fullName: 'GDh. Faresmaathodaa', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-RATHAFANDHOO', name: 'Rathafandhoo', fullName: 'GDh. Rathafandhoo', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  { code: 'GDH-HOADEDHDHOO', name: 'Hoadedhdhoo', fullName: 'GDh. Hoadedhdhoo', atollName: 'South Huvadhu Atoll', type: 'inhabited' },
  
  // ===== GNAVIYANI ATOLL =====
  { code: 'GN-FUVAHMULAH', name: 'Fuvahmulah', fullName: 'Gn. Fuvahmulah', atollName: 'Fuvahmulah Atoll', type: 'inhabited' },
  
  // ===== SEENU ATOLL (ADDU) =====
  { code: 'S-HITHADHOO', name: 'Hithadhoo', fullName: 'S. Hithadhoo', atollName: 'Addu Atoll', type: 'inhabited' },
  { code: 'S-MARADHOO', name: 'Maradhoo', fullName: 'S. Maradhoo', atollName: 'Addu Atoll', type: 'inhabited' },
  { code: 'S-FEYDHOO', name: 'Feydhoo', fullName: 'S. Feydhoo', atollName: 'Addu Atoll', type: 'inhabited' },
  { code: 'S-HULHUDHOO', name: 'Hulhudhoo', fullName: 'S. Hulhudhoo', atollName: 'Addu Atoll', type: 'inhabited' },
  { code: 'S-MEEDHOO', name: 'Meedhoo', fullName: 'S. Meedhoo', atollName: 'Addu Atoll', type: 'inhabited' },
  { code: 'S-GAN', name: 'Gan', fullName: 'S. Gan', atollName: 'Addu Atoll', type: 'inhabited' },
  { code: 'S-MARADHOO-FEYDHOO', name: 'Maradhoo-Feydhoo', fullName: 'S. Maradhoo-Feydhoo', atollName: 'Addu Atoll', type: 'inhabited' },
];

// Search helper function
export function searchIslands(query: string): Island[] {
  const lowerQuery = query.toLowerCase();
  return ISLANDS.filter(
    island =>
      island.name.toLowerCase().includes(lowerQuery) ||
      island.fullName.toLowerCase().includes(lowerQuery) ||
      island.atollName.toLowerCase().includes(lowerQuery)
  );
}