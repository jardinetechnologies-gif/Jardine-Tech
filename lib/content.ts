// Content source of truth for the Jardine Technologies site.
// Every page reads from here — edit the copy in this file and the whole site updates.

export type Pair = { label: string; value: string };

export interface Phone { label: string; display: string; href: string }

export interface Product {
  slug: string;
  cat: string;
  image: string;
  title: string;
  kicker: string;
  short: string;
  desc: string[];
  specs: Pair[];
  features: string[];
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  image: string;
  intro: string[];
  includes: string[];
  ideal: string[];
  products: string[];
}

export interface Category { slug: string; title: string; desc: string; image: string }
export interface Brand { slug: string; name: string }
export interface Social { slug: string; name: string; url: string }
export interface TeamMember {
  name: string; role: string; bio: string;
  photo: string | null; email: string; linkedin: string;
}
export interface Titled { title: string; text: string }

export const COMPANY = {
  "name": "Jardine Technologies",
  "tagline": "Technology. Solutions. Trust.",
  "address_lines": [
    "Regus Mont Kiara",
    "Block L, Level 7, Jalan Solaris",
    "Solaris Mont Kiara, 50480 Kuala Lumpur",
    "Federal Territory of Kuala Lumpur, Malaysia"
  ],
  "email": "Jardinetechnologies@gmail.com",
  "phones": [
    {
      "label": "Malaysia",
      "display": "+60 11-2073 0446",
      "href": "+601120730446"
    },
    {
      "label": "Kenya",
      "display": "+254 740 378718",
      "href": "+254740378718"
    }
  ]
};

export const SERVICES: Service[] = [
  {
    "slug": "it-consultation-solution-design",
    "title": "IT Consultation & Solution Design",
    "short": "We start with the requirement, not the catalogue — mapping your operational needs to a technology design that actually fits.",
    "image": "consult",
    "intro": [
      "Every organisation has different operational requirements, budgets, infrastructure and future objectives. Before a single line item is quoted, our team works with you to understand what the technology actually has to do — how many users, what workloads, which sites, what growth is expected, and what constraints exist around budget and timelines.",
      "From there we produce a solution design: a clear, documented recommendation covering the products, configurations and quantities required, with alternatives where they make commercial sense. The objective is a decision you can defend internally, not a list of parts."
    ],
    "includes": [
      "Requirement gathering workshops with technical and procurement stakeholders",
      "Site and infrastructure assessment for new offices, branches and data rooms",
      "Solution architecture covering compute, network, security, storage and power",
      "Compatibility and interoperability validation across vendors",
      "Bill of materials with clear specifications and quantities",
      "Budget-tiered options — good, better, best — with trade-offs explained"
    ],
    "ideal": [
      "Organisations planning a new office, branch or campus rollout",
      "Teams replacing ageing infrastructure and unsure where to start",
      "Procurement departments that need a defensible technical specification",
      "NGOs and institutions preparing tender or grant documentation"
    ],
    "products": [
      "business-laptop-14",
      "rack-server-2u",
      "managed-switch-48p"
    ]
  },
  {
    "slug": "technology-sourcing-procurement",
    "title": "Technology Sourcing & Procurement",
    "short": "Access to a broad range of international technology brands through established Malaysian and Dubai distribution channels.",
    "image": "cat-computing",
    "intro": [
      "We source enterprise and business technology from leading global manufacturers and authorised distribution partners. Our position between the Malaysian technology ecosystem and Dubai's re-export channels gives us practical flexibility on availability, pricing and lead times — particularly for markets across Africa where local stock is limited.",
      "Procurement is where most technology projects lose time. We consolidate multi-vendor requirements into a single quotation, confirm genuine stock before committing, and keep you informed on specifications, warranty terms and realistic delivery windows."
    ],
    "includes": [
      "Multi-brand sourcing across computing, networking, security, storage and power",
      "Consolidated quotations covering multiple manufacturers in one document",
      "Genuine-product verification through authorised distribution channels",
      "Stock availability and lead-time confirmation before commitment",
      "Warranty, support-pack and service-level options priced transparently",
      "Volume and project pricing for large deployments"
    ],
    "ideal": [
      "Businesses buying across several manufacturers at once",
      "Government and institutional buyers requiring documented sourcing",
      "Resellers and system integrators needing supply depth",
      "Projects where local market availability is a constraint"
    ],
    "products": [
      "business-laptop-14",
      "workstation-tower",
      "business-monitor-27"
    ]
  },
  {
    "slug": "global-logistics-supply",
    "title": "Global Logistics & Supply Coordination",
    "short": "Malaysia to Dubai to Africa — consolidation, documentation, shipping and customs coordination handled as one process.",
    "image": "logistics",
    "intro": [
      "International IT procurement is rarely complicated by the products themselves. It is shipping, documentation, customs, warranties and lead times that create risk. Our role is to coordinate those elements so that equipment arrives complete, on schedule and correctly documented.",
      "We consolidate shipments through our Dubai supply network, prepare accurate commercial documentation, and coordinate with freight partners and clearing agents in the destination market. You get one point of contact for the whole movement rather than four."
    ],
    "includes": [
      "Consolidation of multi-vendor orders into single shipments",
      "Air and sea freight coordination with vetted logistics partners",
      "Accurate commercial invoices, packing lists and certificates of origin",
      "Customs documentation support and clearing-agent coordination",
      "Shipment tracking and proactive lead-time updates",
      "Delivery scheduling aligned to installation and go-live dates"
    ],
    "ideal": [
      "Buyers importing enterprise equipment into African markets",
      "Projects with phased delivery across multiple sites",
      "Organisations that have previously faced customs or documentation delays",
      "Programmes with fixed go-live dates and no room for slippage"
    ],
    "products": [
      "rack-server-2u",
      "storage-array-4u",
      "rack-ups-3kva"
    ]
  },
  {
    "slug": "network-infrastructure",
    "title": "Network Infrastructure & Connectivity",
    "short": "Switching, routing, wireless and structured cabling designed for reliable day-to-day performance and future capacity.",
    "image": "cat-networking",
    "intro": [
      "A network is the layer everything else depends on. We design and supply enterprise networking environments — core and access switching, routing, wireless coverage, gateways and structured cabling — sized for present demand and scalable for growth.",
      "Designs are built around real conditions: floor plans, user density, device counts, bandwidth requirements and the applications that matter most. Configuration standards, VLAN structure and addressing plans are documented so your team or ours can support the environment confidently."
    ],
    "includes": [
      "Core, distribution and access switching design and supply",
      "Enterprise wireless surveys, access point placement and controller setup",
      "Routing, gateway and SD-WAN equipment supply",
      "Structured cabling, patch panels, racks and cable management",
      "VLAN, addressing and configuration standards documentation",
      "Commissioning, testing and handover"
    ],
    "ideal": [
      "New office fit-outs and campus network builds",
      "Sites with poor wireless coverage or ageing switch infrastructure",
      "Multi-branch organisations standardising their network estate",
      "Environments preparing for higher-bandwidth applications"
    ],
    "products": [
      "managed-switch-48p",
      "wireless-ap-wifi6",
      "firewall-appliance"
    ]
  },
  {
    "slug": "server-data-centre",
    "title": "Server & Data Centre Solutions",
    "short": "Rack and tower servers, virtualisation platforms, rack build-outs and power protection for resilient core infrastructure.",
    "image": "cat-servers",
    "intro": [
      "Whether you are running a single application server in a comms room or building a full rack environment, the requirement is the same: dependable compute, sized correctly, with the power and cooling to keep it running.",
      "We specify servers around the workload — virtualisation, databases, file and print, line-of-business applications or backup targets — then supply the surrounding infrastructure: racks, PDUs, UPS systems, KVM, and the components needed for a clean, serviceable installation."
    ],
    "includes": [
      "Rack and tower server specification, supply and configuration",
      "Virtualisation platform sizing and licensing",
      "Server components — memory, processors, drives, controllers, network cards",
      "Racks, PDUs, cable management and rack build-out",
      "UPS and power-protection sizing with runtime calculations",
      "Installation, rack-and-stack and commissioning support"
    ],
    "ideal": [
      "Organisations consolidating ageing physical servers onto virtualisation",
      "Businesses establishing an on-premise server room",
      "Institutions needing resilient compute for core applications",
      "Projects requiring documented rack layouts and power budgets"
    ],
    "products": [
      "rack-server-2u",
      "rack-ups-3kva",
      "enterprise-ssd"
    ]
  },
  {
    "slug": "cybersecurity-implementation",
    "title": "Cybersecurity Implementation",
    "short": "Firewalls, endpoint protection and security appliances deployed as a coherent posture rather than disconnected products.",
    "image": "cat-security",
    "intro": [
      "Security products only work when they are configured, monitored and maintained as part of a coherent posture. We help organisations select and deploy network and endpoint security appropriate to their size, risk profile and internal capability.",
      "That means perimeter and internal segmentation, endpoint protection across the estate, secure remote access for distributed teams, and clear policies for updates and licence renewals — with training so your team knows what the tools are telling them."
    ],
    "includes": [
      "Next-generation firewall supply, configuration and policy design",
      "Network segmentation and secure remote access (VPN / ZTNA)",
      "Endpoint protection, EDR and device management licensing",
      "Email and web security gateways",
      "Security appliance sizing for throughput and user counts",
      "Licence renewal management and administrator handover training"
    ],
    "ideal": [
      "Organisations with compliance or donor-driven security requirements",
      "Businesses supporting remote and hybrid workforces",
      "Institutions holding sensitive personal or financial data",
      "Teams replacing consumer-grade security with enterprise tooling"
    ],
    "products": [
      "firewall-appliance",
      "managed-switch-48p",
      "endpoint-security-suite"
    ]
  },
  {
    "slug": "data-storage-backup",
    "title": "Data Storage & Backup",
    "short": "Storage arrays, NAS and SAN platforms, and backup infrastructure built around a recovery objective you can actually meet.",
    "image": "cat-storage",
    "intro": [
      "Storage decisions are usually made on capacity alone. We start with the recovery objective — how much data you can afford to lose and how quickly you need to be operational — and design backwards from there.",
      "The result is a storage and backup design that balances performance, capacity, retention and cost, with a tested restore process rather than an assumption that backups are working."
    ],
    "includes": [
      "Enterprise storage array, NAS and SAN specification and supply",
      "Capacity, IOPS and growth planning",
      "Enterprise SSD, HDD and drive-tier selection",
      "Backup software licensing and backup target infrastructure",
      "Offsite, cloud and hybrid retention strategy",
      "Restore testing and documented recovery procedures"
    ],
    "ideal": [
      "Organisations with growing unstructured data and no clear retention plan",
      "Teams whose backups have never been restore-tested",
      "Businesses with regulatory or donor data-retention obligations",
      "Sites consolidating scattered file storage onto a central platform"
    ],
    "products": [
      "storage-array-4u",
      "nas-4bay",
      "enterprise-ssd"
    ]
  },
  {
    "slug": "software-licensing",
    "title": "Software & Licensing",
    "short": "Operating systems, productivity, virtualisation and security licensing — correctly specified, genuine, and renewal-managed.",
    "image": "cat-software",
    "intro": [
      "Licensing is where budgets quietly leak. Over-licensing wastes money; under-licensing creates audit exposure. We help organisations buy the right licence type, in the right quantity, on the right agreement.",
      "We supply genuine licences for operating systems, productivity suites, enterprise applications, virtualisation platforms and security software, and we track renewal dates so nothing lapses unexpectedly."
    ],
    "includes": [
      "Operating system and server licensing (per-core, per-user, per-device)",
      "Productivity and collaboration suite licensing",
      "Virtualisation and hypervisor licensing",
      "Security and endpoint protection subscriptions",
      "Licence position review and true-up support",
      "Renewal calendar management and advance notification"
    ],
    "ideal": [
      "Organisations unsure of their current licence position",
      "Teams consolidating scattered subscriptions onto one agreement",
      "Institutions eligible for education or non-profit licensing",
      "Businesses preparing for a vendor licence audit"
    ],
    "products": [
      "endpoint-security-suite",
      "office-productivity-licence",
      "business-laptop-14"
    ]
  },
  {
    "slug": "deployment-support",
    "title": "Deployment & Ongoing Support",
    "short": "Installation, configuration, handover and continued technology support — we stay involved after delivery.",
    "image": "cat-infrastructure",
    "intro": [
      "Delivery is not the finish line. Equipment has to be installed, configured, integrated, documented and handed over to people who understand how to run it — and then supported as requirements change.",
      "We coordinate deployment on site or remotely, provide as-built documentation, train administrators, and remain available for follow-on requirements, expansions, spares and warranty coordination."
    ],
    "includes": [
      "On-site and remote installation and configuration",
      "Device imaging, staging and asset tagging for bulk rollouts",
      "Migration and cutover planning with rollback options",
      "As-built documentation and configuration handover packs",
      "Administrator and end-user training sessions",
      "Warranty coordination, spares supply and expansion planning"
    ],
    "ideal": [
      "Bulk laptop and desktop rollouts requiring standard images",
      "Organisations without in-house infrastructure engineers",
      "Multi-site deployments needing consistent configuration",
      "Clients wanting one accountable partner beyond delivery"
    ],
    "products": [
      "business-laptop-14",
      "docking-station",
      "mfp-printer"
    ]
  }
];

export const CATEGORIES: Category[] = [
  {
    "slug": "computing",
    "title": "Computing Solutions",
    "image": "cat-computing",
    "desc": "Business laptops, desktops, workstations, all-in-one computers, tablets and professional computing devices."
  },
  {
    "slug": "servers",
    "title": "Servers & Data Centre",
    "image": "cat-servers",
    "desc": "Enterprise servers, rack and tower systems, server components and data centre infrastructure."
  },
  {
    "slug": "networking",
    "title": "Networking Infrastructure",
    "image": "cat-networking",
    "desc": "Enterprise switches, routers, wireless access points, gateways and structured networking equipment."
  },
  {
    "slug": "security",
    "title": "Cybersecurity Solutions",
    "image": "cat-security",
    "desc": "Network security, endpoint protection, firewalls, security appliances and related technologies."
  },
  {
    "slug": "storage",
    "title": "Data Storage & Backup",
    "image": "cat-storage",
    "desc": "Enterprise storage arrays, SSDs, HDDs, NAS and SAN solutions and backup infrastructure."
  },
  {
    "slug": "peripherals",
    "title": "IT Peripherals & Accessories",
    "image": "cat-peripherals",
    "desc": "Monitors, printers, scanners, UPS systems, docking stations, input devices and cabling."
  },
  {
    "slug": "software",
    "title": "Software & Licensing",
    "image": "cat-software",
    "desc": "Operating systems, productivity software, enterprise applications, security software and licensing."
  },
  {
    "slug": "infrastructure",
    "title": "Complete IT Infrastructure",
    "image": "cat-infrastructure",
    "desc": "End-to-end environments combining compute, network, security, storage, power and software."
  }
];

export const PRODUCTS: Product[] = [
  {
    "slug": "business-laptop-14",
    "cat": "computing",
    "image": "cat-computing",
    "title": "14\" Business Ultrabook",
    "kicker": "Mobile workforce",
    "short": "Lightweight enterprise notebook for mobile and hybrid teams, available in multiple processor and memory configurations.",
    "desc": [
      "A thin-and-light business notebook built for staff who work across offices, sites and home. Configurable across current-generation processors, memory and NVMe storage tiers, with vPro-class management options for organisations that image and manage devices centrally.",
      "Supplied with commercial warranty options, optional on-site coverage, and available for bulk rollout with standard imaging and asset tagging."
    ],
    "specs": [
      {
        "label": "Display",
        "value": "14\" IPS, FHD or QHD, anti-glare, optional touch"
      },
      {
        "label": "Processor",
        "value": "Current-generation Intel Core or AMD Ryzen, business class"
      },
      {
        "label": "Memory",
        "value": "8 GB / 16 GB / 32 GB DDR5, configurable"
      },
      {
        "label": "Storage",
        "value": "256 GB – 2 TB NVMe SSD"
      },
      {
        "label": "Connectivity",
        "value": "Wi-Fi 6E, Bluetooth 5.3, optional LTE/5G WWAN"
      },
      {
        "label": "Ports",
        "value": "2 × USB-C (Thunderbolt optional), USB-A, HDMI, audio"
      },
      {
        "label": "Security",
        "value": "TPM 2.0, fingerprint reader, IR camera, privacy shutter"
      },
      {
        "label": "Weight",
        "value": "From approximately 1.2 kg"
      },
      {
        "label": "Warranty",
        "value": "1–5 year commercial warranty, on-site options available"
      }
    ],
    "features": [
      "Central imaging and asset tagging for bulk rollouts",
      "Docking-station compatible for hot-desk environments",
      "Business-class manageability and firmware controls",
      "Multi-year warranty and accidental damage options"
    ]
  },
  {
    "slug": "workstation-tower",
    "cat": "computing",
    "image": "p-workstation",
    "title": "Professional Tower Workstation",
    "kicker": "High performance",
    "short": "Expandable desktop workstation for engineering, design, analytics and other performance-critical workloads.",
    "desc": [
      "A serviceable tower platform for users whose workloads exceed a standard desktop — CAD and BIM, video production, GIS, data analysis and development environments. Configurable with professional graphics, ECC memory and multiple drive tiers.",
      "Designed for long service life with tool-less access, generous expansion and certified drivers for professional applications."
    ],
    "specs": [
      {
        "label": "Processor",
        "value": "Multi-core desktop or workstation-class CPU"
      },
      {
        "label": "Memory",
        "value": "16 GB – 128 GB, ECC options available"
      },
      {
        "label": "Graphics",
        "value": "Professional GPU options with certified drivers"
      },
      {
        "label": "Storage",
        "value": "NVMe SSD boot plus SATA/NVMe capacity drives, RAID options"
      },
      {
        "label": "Expansion",
        "value": "Multiple PCIe slots, tool-less chassis access"
      },
      {
        "label": "Power",
        "value": "80 PLUS efficiency PSU, sized to configuration"
      },
      {
        "label": "Ports",
        "value": "USB-C, USB-A, DisplayPort/HDMI, 2.5 GbE optional"
      },
      {
        "label": "Warranty",
        "value": "1–5 year commercial warranty, on-site options available"
      }
    ],
    "features": [
      "ISV-certified for major professional applications",
      "Tool-less serviceability and generous expansion",
      "ECC memory options for data-integrity workloads",
      "Configurable to workload rather than fixed SKU"
    ]
  },
  {
    "slug": "aio-desktop",
    "cat": "computing",
    "image": "cat-peripherals",
    "title": "All-in-One Business Desktop",
    "kicker": "Space efficient",
    "short": "Cable-light all-in-one desktop for reception areas, training rooms, clinics and open-plan offices.",
    "desc": [
      "An all-in-one form factor that removes tower and cable clutter from front-of-house and shared workspaces while retaining business-class manageability and serviceability.",
      "Suited to environments where desk space is limited and appearance matters — reception counters, consultation rooms, training labs and shared workstations."
    ],
    "specs": [
      {
        "label": "Display",
        "value": "23.8\" or 27\" FHD/QHD IPS, optional touch"
      },
      {
        "label": "Processor",
        "value": "Business-class Intel Core or AMD Ryzen"
      },
      {
        "label": "Memory",
        "value": "8 GB – 32 GB DDR5"
      },
      {
        "label": "Storage",
        "value": "256 GB – 1 TB NVMe SSD"
      },
      {
        "label": "Connectivity",
        "value": "Wi-Fi 6, Gigabit Ethernet, Bluetooth 5.3"
      },
      {
        "label": "Extras",
        "value": "Integrated camera with privacy shutter, stereo speakers"
      },
      {
        "label": "Mounting",
        "value": "VESA-compatible stand or wall mount"
      },
      {
        "label": "Warranty",
        "value": "1–3 year commercial warranty"
      }
    ],
    "features": [
      "Minimal cabling for clean public-facing spaces",
      "Optional touch panels for kiosk and clinical use",
      "Central management support",
      "VESA mounting for fixed installations"
    ]
  },
  {
    "slug": "rack-server-2u",
    "cat": "servers",
    "image": "cat-servers",
    "title": "2U Enterprise Rack Server",
    "kicker": "Core compute",
    "short": "Dual-socket rack server for virtualisation, databases and core business applications, configurable to workload.",
    "desc": [
      "A 2U dual-socket platform suited to virtualisation hosts, database servers, file services and application workloads. Configurable across processor counts, memory capacity, drive tiers and network adapters.",
      "Supplied with redundant power, out-of-band management and rail kits, with optional rack, PDU and UPS supplied as part of a complete rack build."
    ],
    "specs": [
      {
        "label": "Form factor",
        "value": "2U rack-mount, rail kit and cable arm included"
      },
      {
        "label": "Processor",
        "value": "Single or dual server-class CPUs"
      },
      {
        "label": "Memory",
        "value": "Up to 4 TB DDR5 RDIMM depending on configuration"
      },
      {
        "label": "Drive bays",
        "value": "8–24 hot-swap SFF or LFF bays"
      },
      {
        "label": "Storage",
        "value": "SAS / SATA / NVMe with hardware RAID controller"
      },
      {
        "label": "Networking",
        "value": "Onboard 1/10 GbE, optional 25/100 GbE adapters"
      },
      {
        "label": "Power",
        "value": "Redundant hot-plug power supplies"
      },
      {
        "label": "Management",
        "value": "Dedicated out-of-band management port and licence"
      },
      {
        "label": "Warranty",
        "value": "3–5 year support packs with response-time options"
      }
    ],
    "features": [
      "Sized against your actual virtualisation workload",
      "Redundant power and hot-swap serviceability",
      "Out-of-band management for remote administration",
      "Rack, PDU and UPS available as a complete build"
    ]
  },
  {
    "slug": "tower-server",
    "cat": "servers",
    "image": "p-workstation",
    "title": "Tower Server",
    "kicker": "Branch & SMB",
    "short": "Quiet, self-contained server for small offices and branch sites without a dedicated server room.",
    "desc": [
      "A tower-format server for organisations that need reliable central compute but have no rack or dedicated comms room. Quiet enough for an office environment while retaining server-grade components and redundancy options.",
      "Commonly deployed for file and print services, directory services, line-of-business applications and small virtualisation hosts at branch locations."
    ],
    "specs": [
      {
        "label": "Form factor",
        "value": "Tower, rack-conversion kit optional"
      },
      {
        "label": "Processor",
        "value": "Single server-class CPU, multi-core"
      },
      {
        "label": "Memory",
        "value": "16 GB – 512 GB ECC"
      },
      {
        "label": "Drive bays",
        "value": "4–8 hot-swap bays"
      },
      {
        "label": "Storage",
        "value": "SATA / SAS / NVMe with RAID controller"
      },
      {
        "label": "Networking",
        "value": "Dual Gigabit or 10 GbE onboard"
      },
      {
        "label": "Power",
        "value": "Single or redundant power supply options"
      },
      {
        "label": "Warranty",
        "value": "3–5 year support packs available"
      }
    ],
    "features": [
      "Office-acceptable acoustics",
      "Optional rack conversion for future growth",
      "ECC memory and RAID as standard options",
      "Ideal branch-office consolidation platform"
    ]
  },
  {
    "slug": "managed-switch-48p",
    "cat": "networking",
    "image": "cat-networking",
    "title": "48-Port Managed Switch",
    "kicker": "Access layer",
    "short": "Layer 2/3 managed access switch with PoE+ options and uplinks for enterprise campus and branch networks.",
    "desc": [
      "A managed access switch for enterprise and campus networks, available with or without PoE+ for powering access points, IP telephony and cameras. Stackable options allow multiple units to be managed as a single logical switch.",
      "Supplied configured to your VLAN and addressing plan where required, with documentation handed over at commissioning."
    ],
    "specs": [
      {
        "label": "Ports",
        "value": "48 × 1 GbE access ports, PoE+ optional"
      },
      {
        "label": "Uplinks",
        "value": "4 × 10 GbE SFP+ (25 GbE options available)"
      },
      {
        "label": "Switching",
        "value": "Layer 2 with static or dynamic Layer 3 routing"
      },
      {
        "label": "PoE budget",
        "value": "Up to 740 W on PoE+ models"
      },
      {
        "label": "Stacking",
        "value": "Physical or virtual stacking supported"
      },
      {
        "label": "Management",
        "value": "CLI, web GUI, SNMP and cloud management options"
      },
      {
        "label": "Redundancy",
        "value": "Optional redundant power supply"
      },
      {
        "label": "Warranty",
        "value": "Limited lifetime and extended support options"
      }
    ],
    "features": [
      "PoE+ for access points, phones and cameras",
      "10 GbE uplinks for future capacity",
      "Pre-configured to your VLAN plan on request",
      "Stackable for simplified administration"
    ]
  },
  {
    "slug": "wireless-ap-wifi6",
    "cat": "networking",
    "image": "p-ap",
    "title": "Wi-Fi 6 Enterprise Access Point",
    "kicker": "Wireless coverage",
    "short": "Ceiling-mount dual-band access point for high-density offices, campuses, clinics and public areas.",
    "desc": [
      "An enterprise access point designed for high client density and consistent throughput. Deployed against a coverage plan rather than guesswork, with controller-based or cloud-managed administration.",
      "Where required we conduct a wireless survey to determine placement, channel plan and power levels before installation."
    ],
    "specs": [
      {
        "label": "Standard",
        "value": "Wi-Fi 6 (802.11ax), dual-band 2.4/5 GHz"
      },
      {
        "label": "Streams",
        "value": "2×2 or 4×4 MU-MIMO depending on model"
      },
      {
        "label": "Uplink",
        "value": "1 GbE or 2.5 GbE, PoE+ powered"
      },
      {
        "label": "Clients",
        "value": "Designed for high-density client environments"
      },
      {
        "label": "Management",
        "value": "Controller-based, on-premise or cloud"
      },
      {
        "label": "Security",
        "value": "WPA3, multiple SSIDs, guest isolation"
      },
      {
        "label": "Mounting",
        "value": "Ceiling or wall mount, hardware included"
      },
      {
        "label": "Warranty",
        "value": "Limited lifetime and support options available"
      }
    ],
    "features": [
      "Deployed against a surveyed coverage plan",
      "WPA3 with segregated guest networking",
      "PoE+ powered from your access switch",
      "Cloud or on-premise management"
    ]
  },
  {
    "slug": "firewall-appliance",
    "cat": "security",
    "image": "cat-security",
    "title": "Next-Generation Firewall Appliance",
    "kicker": "Perimeter security",
    "short": "Desktop or rack firewall with application control, IPS, web filtering and secure remote access.",
    "desc": [
      "A next-generation firewall sized to your throughput and user count, providing perimeter protection, internal segmentation and secure remote access for distributed teams.",
      "Supplied with the appropriate security subscription bundle and configured to a documented policy set, with administrator handover training available."
    ],
    "specs": [
      {
        "label": "Form factor",
        "value": "Desktop or 1U rack-mount depending on model"
      },
      {
        "label": "Throughput",
        "value": "Sized to user count and internet bandwidth"
      },
      {
        "label": "Services",
        "value": "IPS, application control, web filtering, anti-malware"
      },
      {
        "label": "VPN",
        "value": "IPsec and SSL VPN, ZTNA options"
      },
      {
        "label": "Interfaces",
        "value": "Multiple GbE, SFP+ on larger models"
      },
      {
        "label": "High availability",
        "value": "Active-passive or active-active clustering"
      },
      {
        "label": "Subscriptions",
        "value": "1–5 year security service bundles"
      },
      {
        "label": "Warranty",
        "value": "Hardware warranty with advance-replacement options"
      }
    ],
    "features": [
      "Sized correctly for throughput, not guessed",
      "Documented policy set at handover",
      "Secure remote access for hybrid teams",
      "HA clustering for critical sites"
    ]
  },
  {
    "slug": "endpoint-security-suite",
    "cat": "security",
    "image": "cat-software",
    "title": "Endpoint Protection & EDR Licensing",
    "kicker": "Endpoint security",
    "short": "Managed endpoint protection and detection licensing across laptops, desktops and servers.",
    "desc": [
      "Endpoint protection licensing with detection-and-response capability, covering workstations, laptops and servers under a single management console.",
      "Licensed per device or per user across one to five year terms, with renewal tracking so coverage never lapses unnoticed."
    ],
    "specs": [
      {
        "label": "Coverage",
        "value": "Windows, macOS, Linux endpoints and servers"
      },
      {
        "label": "Capability",
        "value": "Next-gen anti-malware, EDR, device and application control"
      },
      {
        "label": "Management",
        "value": "Cloud or on-premise console"
      },
      {
        "label": "Licensing",
        "value": "Per device or per user, 1–5 year terms"
      },
      {
        "label": "Reporting",
        "value": "Centralised alerting, reporting and rollback"
      },
      {
        "label": "Deployment",
        "value": "Remote rollout support available"
      }
    ],
    "features": [
      "Single console across the whole estate",
      "Renewal calendar managed on your behalf",
      "Rollout and configuration support included as a service",
      "Genuine licensing through authorised channels"
    ]
  },
  {
    "slug": "storage-array-4u",
    "cat": "storage",
    "image": "cat-storage",
    "title": "4U Enterprise Storage Array",
    "kicker": "Primary storage",
    "short": "High-density rack storage array for virtualisation, file services, media and backup targets.",
    "desc": [
      "A high-density storage platform for consolidating file services, virtualisation datastores, media libraries and backup targets onto a single managed system.",
      "Configured against capacity, performance and retention requirements, with drive tiering and RAID protection selected to match the recovery objective."
    ],
    "specs": [
      {
        "label": "Form factor",
        "value": "4U rack-mount, high-density drive chassis"
      },
      {
        "label": "Drive bays",
        "value": "24–36 hot-swap LFF bays"
      },
      {
        "label": "Drive support",
        "value": "Enterprise SAS, SATA and NVMe tiers"
      },
      {
        "label": "Protection",
        "value": "Hardware RAID with hot-spare support"
      },
      {
        "label": "Connectivity",
        "value": "10/25 GbE iSCSI, optional Fibre Channel"
      },
      {
        "label": "Protocols",
        "value": "Block and file protocols depending on platform"
      },
      {
        "label": "Power",
        "value": "Redundant hot-plug power supplies"
      },
      {
        "label": "Warranty",
        "value": "3–5 year support packs with response options"
      }
    ],
    "features": [
      "Sized from your recovery objective, not just capacity",
      "Mixed drive tiers for cost and performance balance",
      "Redundant power and hot-swap drives",
      "Backup target and replication ready"
    ]
  },
  {
    "slug": "nas-4bay",
    "cat": "storage",
    "image": "p-nas",
    "title": "4-Bay Business NAS",
    "kicker": "Shared storage",
    "short": "Compact network storage for small offices, branch file services, surveillance and local backup.",
    "desc": [
      "A desktop network-attached storage appliance for small offices and branch sites — centralised file sharing, local backup targets, surveillance recording and departmental storage.",
      "Supplied populated with enterprise-rated drives and configured with the appropriate RAID level, share structure and backup replication."
    ],
    "specs": [
      {
        "label": "Bays",
        "value": "4 × 3.5\"/2.5\" hot-swap bays"
      },
      {
        "label": "Capacity",
        "value": "Configured to requirement, enterprise-rated drives"
      },
      {
        "label": "Protection",
        "value": "RAID 1/5/6/10 with hot-spare option"
      },
      {
        "label": "Networking",
        "value": "Dual Gigabit or 2.5/10 GbE options"
      },
      {
        "label": "Protocols",
        "value": "SMB, NFS, iSCSI, AFP"
      },
      {
        "label": "Backup",
        "value": "Scheduled replication to secondary or cloud targets"
      },
      {
        "label": "Expansion",
        "value": "Optional expansion unit support"
      },
      {
        "label": "Warranty",
        "value": "2–5 year warranty options"
      }
    ],
    "features": [
      "Supplied populated and pre-configured",
      "Replication to offsite or cloud targets",
      "Enterprise-rated drives, not desktop media",
      "Suitable as a surveillance recording target"
    ]
  },
  {
    "slug": "enterprise-ssd",
    "cat": "storage",
    "image": "p-ssd",
    "title": "Enterprise SSD & Drive Media",
    "kicker": "Drive media",
    "short": "Data-centre rated SSDs, NVMe drives and enterprise HDDs supplied to match your controller and workload.",
    "desc": [
      "Data-centre class drive media selected against workload endurance requirements — read-intensive, mixed-use or write-intensive — and validated for compatibility with your server or array controller.",
      "Supplied in matched sets for RAID groups, with spares held where continuity of supply matters."
    ],
    "specs": [
      {
        "label": "Form factors",
        "value": "2.5\" SATA/SAS, U.2/U.3 NVMe, M.2, 3.5\" HDD"
      },
      {
        "label": "Endurance tiers",
        "value": "Read-intensive, mixed-use, write-intensive"
      },
      {
        "label": "Capacity",
        "value": "480 GB – 30 TB depending on media type"
      },
      {
        "label": "Interface",
        "value": "SATA 6 Gb/s, SAS 12/24 Gb/s, PCIe NVMe"
      },
      {
        "label": "Features",
        "value": "Power-loss protection, end-to-end data protection"
      },
      {
        "label": "Compatibility",
        "value": "Validated against your controller and chassis"
      },
      {
        "label": "Warranty",
        "value": "3–5 year manufacturer warranty"
      }
    ],
    "features": [
      "Endurance tier matched to actual workload",
      "Controller and firmware compatibility validated",
      "Matched sets supplied for RAID groups",
      "Spares programme available for critical systems"
    ]
  },
  {
    "slug": "business-monitor-27",
    "cat": "peripherals",
    "image": "p-monitor",
    "title": "27\" Business Monitor",
    "kicker": "Displays",
    "short": "Ergonomic QHD business display with USB-C docking options for single-cable desk setups.",
    "desc": [
      "A 27-inch business display with full ergonomic adjustment and optional USB-C power delivery, allowing a single cable to carry video, data and laptop charging.",
      "Available in FHD, QHD and 4K panels, with daisy-chain support for dual-screen configurations from one laptop port."
    ],
    "specs": [
      {
        "label": "Panel",
        "value": "27\" IPS, FHD / QHD / 4K options"
      },
      {
        "label": "Connectivity",
        "value": "USB-C (up to 90 W PD), HDMI, DisplayPort"
      },
      {
        "label": "Hub",
        "value": "Integrated USB hub and optional RJ45"
      },
      {
        "label": "Ergonomics",
        "value": "Height, tilt, swivel and pivot adjustment"
      },
      {
        "label": "Daisy chain",
        "value": "DisplayPort out for dual-display setups"
      },
      {
        "label": "Eye comfort",
        "value": "Flicker-free with low blue-light modes"
      },
      {
        "label": "Mounting",
        "value": "VESA 100 × 100 compatible"
      },
      {
        "label": "Warranty",
        "value": "3-year warranty with panel coverage"
      }
    ],
    "features": [
      "Single-cable USB-C desk setup",
      "Full ergonomic adjustment for shared desks",
      "Daisy chain for dual-monitor configurations",
      "Bulk supply for office fit-outs"
    ]
  },
  {
    "slug": "rack-ups-3kva",
    "cat": "peripherals",
    "image": "p-ups",
    "title": "3 kVA Rack-Mount UPS",
    "kicker": "Power protection",
    "short": "Line-interactive or online UPS with network management card and configurable runtime.",
    "desc": [
      "Rack-mount uninterruptible power supply sized against your actual load and required runtime, protecting servers, switches and storage from outages and power quality issues.",
      "Supplied with a network management card for monitoring and automated graceful shutdown, plus optional extended battery modules."
    ],
    "specs": [
      {
        "label": "Capacity",
        "value": "1–10 kVA range, 3 kVA typical"
      },
      {
        "label": "Topology",
        "value": "Line-interactive or double-conversion online"
      },
      {
        "label": "Form factor",
        "value": "2U rack-mount, tower-convertible options"
      },
      {
        "label": "Runtime",
        "value": "Calculated to load, extended battery modules available"
      },
      {
        "label": "Management",
        "value": "Network management card, SNMP monitoring"
      },
      {
        "label": "Shutdown",
        "value": "Automated graceful shutdown software"
      },
      {
        "label": "Outlets",
        "value": "IEC C13 / C19 configurations"
      },
      {
        "label": "Warranty",
        "value": "2–3 year warranty including batteries"
      }
    ],
    "features": [
      "Runtime calculated against your real load",
      "Network monitoring and automated shutdown",
      "Extended battery modules for longer autonomy",
      "Battery replacement programme available"
    ]
  },
  {
    "slug": "mfp-printer",
    "cat": "peripherals",
    "image": "p-printer",
    "title": "Office Multifunction Printer",
    "kicker": "Print & scan",
    "short": "Network multifunction device for print, scan, copy and secure release across shared office environments.",
    "desc": [
      "A departmental multifunction device supporting network printing, scanning to email and folder, copying and secure print release for confidential documents.",
      "Supplied with consumables planning and optional finishing and paper-handling accessories sized to monthly volume."
    ],
    "specs": [
      {
        "label": "Functions",
        "value": "Print, copy, scan, optional fax"
      },
      {
        "label": "Technology",
        "value": "Mono or colour laser"
      },
      {
        "label": "Speed",
        "value": "30–50 ppm depending on model"
      },
      {
        "label": "Duty cycle",
        "value": "Matched to monthly page volume"
      },
      {
        "label": "Connectivity",
        "value": "Gigabit Ethernet, Wi-Fi, mobile print"
      },
      {
        "label": "Security",
        "value": "Secure print release, user authentication"
      },
      {
        "label": "Paper handling",
        "value": "Duplex standard, optional additional trays"
      },
      {
        "label": "Warranty",
        "value": "1–3 year warranty with service options"
      }
    ],
    "features": [
      "Secure print release for confidential documents",
      "Scan to email, folder and cloud destinations",
      "Consumables planning against real volume",
      "Fleet supply for multi-floor offices"
    ]
  },
  {
    "slug": "docking-station",
    "cat": "peripherals",
    "image": "cat-peripherals",
    "title": "USB-C Docking Station",
    "kicker": "Workspace",
    "short": "Universal USB-C dock with dual-display support, Ethernet and power delivery for hot-desk environments.",
    "desc": [
      "A universal docking solution that standardises hot-desk and shared workstations — one cable for dual displays, wired network, peripherals and laptop charging.",
      "Selected for cross-platform compatibility so that mixed laptop estates can share the same desk hardware."
    ],
    "specs": [
      {
        "label": "Interface",
        "value": "USB-C / Thunderbolt compatible"
      },
      {
        "label": "Displays",
        "value": "Dual 4K or single 8K depending on model"
      },
      {
        "label": "Power delivery",
        "value": "65 W – 100 W to host laptop"
      },
      {
        "label": "Network",
        "value": "Gigabit or 2.5 GbE Ethernet"
      },
      {
        "label": "Ports",
        "value": "USB-A and USB-C downstream, audio, card reader options"
      },
      {
        "label": "Compatibility",
        "value": "Windows, macOS, Linux, ChromeOS"
      },
      {
        "label": "Warranty",
        "value": "2–3 year warranty"
      }
    ],
    "features": [
      "One cable for display, data, network and power",
      "Cross-platform for mixed laptop fleets",
      "Standardises hot-desk and shared workspaces",
      "Bulk supply for office rollouts"
    ]
  },
  {
    "slug": "office-productivity-licence",
    "cat": "software",
    "image": "cat-software",
    "title": "Productivity & Collaboration Licensing",
    "kicker": "Licensing",
    "short": "Business productivity, email and collaboration subscriptions licensed correctly for your user profile mix.",
    "desc": [
      "Productivity and collaboration licensing supplied through authorised channels, sized to your actual user profiles rather than a single blanket tier — frontline, standard and power users often need different plans.",
      "Includes tenant setup support, migration assistance and renewal tracking."
    ],
    "specs": [
      {
        "label": "Coverage",
        "value": "Productivity apps, email, storage, collaboration"
      },
      {
        "label": "Licensing model",
        "value": "Per user, monthly or annual commitment"
      },
      {
        "label": "Profiles",
        "value": "Frontline, business and enterprise tiers"
      },
      {
        "label": "Add-ons",
        "value": "Archiving, advanced security, telephony"
      },
      {
        "label": "Migration",
        "value": "Mailbox and file migration support available"
      },
      {
        "label": "Sectors",
        "value": "Education and non-profit pricing where eligible"
      }
    ],
    "features": [
      "Licensed per user profile, not one blanket tier",
      "Education and non-profit eligibility checked",
      "Migration and tenant setup support",
      "Renewal tracking and advance notice"
    ]
  },
  {
    "slug": "virtualisation-platform",
    "cat": "software",
    "image": "cat-servers",
    "title": "Virtualisation Platform Licensing",
    "kicker": "Licensing",
    "short": "Hypervisor and management licensing sized to host cores and cluster design, with backup integration.",
    "desc": [
      "Virtualisation licensing sized to your host core counts and cluster design, including management, high availability and backup integration components.",
      "We model the licensing cost against alternative host configurations so the hardware decision accounts for the software consequence."
    ],
    "specs": [
      {
        "label": "Licensing basis",
        "value": "Per core, per socket or per host depending on vendor"
      },
      {
        "label": "Editions",
        "value": "Standard through enterprise feature tiers"
      },
      {
        "label": "Management",
        "value": "Centralised cluster management included"
      },
      {
        "label": "Availability",
        "value": "HA, live migration and DRS-class features"
      },
      {
        "label": "Backup",
        "value": "Integration with supported backup platforms"
      },
      {
        "label": "Support",
        "value": "Production and business-critical support tiers"
      }
    ],
    "features": [
      "Licensing modelled against host configuration options",
      "Cluster and HA design guidance included",
      "Backup platform integration verified",
      "Renewal and support-tier management"
    ]
  },
  {
    "slug": "office-network-bundle",
    "cat": "infrastructure",
    "image": "cat-infrastructure",
    "title": "Complete Office Network Package",
    "kicker": "Turnkey",
    "short": "A turnkey network build for a new office — switching, wireless, firewall, cabling, rack and power in one scope.",
    "desc": [
      "A single scope of supply covering everything a new office needs to come online: access switching, wireless coverage, perimeter firewall, structured cabling, comms rack, patch panels, UPS and cable management.",
      "Delivered as one project with one point of contact — designed, supplied, installed, tested and documented, with administrator handover at completion."
    ],
    "specs": [
      {
        "label": "Scope",
        "value": "Design, supply, installation, testing and documentation"
      },
      {
        "label": "Switching",
        "value": "Access switches with PoE+ sized to port count"
      },
      {
        "label": "Wireless",
        "value": "Surveyed access point coverage plan"
      },
      {
        "label": "Security",
        "value": "Perimeter firewall with secure remote access"
      },
      {
        "label": "Cabling",
        "value": "Cat6/6A structured cabling, patch panels, testing"
      },
      {
        "label": "Rack",
        "value": "Wall or floor comms rack with PDU and cable management"
      },
      {
        "label": "Power",
        "value": "UPS protection sized to the rack load"
      },
      {
        "label": "Handover",
        "value": "As-built documentation and administrator training"
      }
    ],
    "features": [
      "One scope, one contract, one accountable partner",
      "As-built documentation at handover",
      "Sized from floor plans and headcount",
      "Scalable design for future desks and sites"
    ]
  },
  {
    "slug": "server-room-package",
    "cat": "infrastructure",
    "image": "cat-servers",
    "title": "Server Room Starter Package",
    "kicker": "Turnkey",
    "short": "Rack, servers, storage, switching, UPS and structured power for organisations establishing on-premise infrastructure.",
    "desc": [
      "An end-to-end package for organisations establishing their first on-premise server environment — rack and rails, compute, storage, top-of-rack switching, power distribution and UPS protection.",
      "Supplied with a documented rack layout, power budget and cabling plan, then installed, commissioned and handed over with configuration documentation."
    ],
    "specs": [
      {
        "label": "Rack",
        "value": "42U floor rack with rails, shelves and cable management"
      },
      {
        "label": "Compute",
        "value": "One or more rack servers sized to workload"
      },
      {
        "label": "Storage",
        "value": "Array or NAS sized to capacity and recovery objective"
      },
      {
        "label": "Network",
        "value": "Top-of-rack switching with uplinks"
      },
      {
        "label": "Power",
        "value": "PDUs and UPS with calculated runtime"
      },
      {
        "label": "Documentation",
        "value": "Rack elevation, power budget, cabling schedule"
      },
      {
        "label": "Services",
        "value": "Rack-and-stack, commissioning and handover"
      }
    ],
    "features": [
      "Documented rack elevation and power budget",
      "Commissioned and tested before handover",
      "Expansion headroom designed in",
      "Single accountable supplier for the whole room"
    ]
  }
];

export const VALUES: Titled[] = [
  {
    "title": "Transparency",
    "text": "We provide clear information about products, specifications, pricing, availability, lead times and project requirements. No unnecessary complexity and no hidden surprises."
  },
  {
    "title": "Reliability",
    "text": "Our clients depend on technology to keep their organisations running. We prioritise dependable products, responsible sourcing, accurate specifications and professional service at every stage."
  },
  {
    "title": "Customer Focus",
    "text": "Every customer is different. We take the time to understand the actual requirement before recommending a solution, aligned to operational needs and budget."
  },
  {
    "title": "Quality",
    "text": "We supply genuine, reliable, fit-for-purpose technology from established manufacturers and trusted supply channels. Quality is the whole experience, not just the product."
  },
  {
    "title": "Integrity",
    "text": "We conduct business with honesty, accountability and professionalism. Strong relationships are built by doing what we say and taking responsibility for our commitments."
  },
  {
    "title": "Innovation",
    "text": "Technology evolves rapidly. We continuously explore new solutions and approaches that help organisations improve efficiency, security, productivity and competitiveness."
  },
  {
    "title": "Long-Term Partnerships",
    "text": "We are not interested in being simply another supplier. Our goal is to become a trusted technology partner relied upon for future projects and requirements."
  }
];

export const WHY: Titled[] = [
  {
    "title": "Global Technology Access",
    "text": "Access to a broad range of international technology brands and enterprise solutions."
  },
  {
    "title": "Strategic Supply Network",
    "text": "Malaysia-based operations supported by supply capabilities through Dubai for African markets."
  },
  {
    "title": "End-to-End Solutions",
    "text": "From individual products to complete IT infrastructure projects, tailored to your requirements."
  },
  {
    "title": "Transparent Business Practices",
    "text": "Clear communication, straightforward recommendations and a commitment to honest business practices."
  },
  {
    "title": "Enterprise-Focused Expertise",
    "text": "We understand the requirements of businesses, institutions, government organisations and large-scale IT projects."
  },
  {
    "title": "Value-Driven Approach",
    "text": "We focus on the right balance between performance, quality, scalability, availability and cost."
  },
  {
    "title": "A Partner for the Long Term",
    "text": "We remain involved beyond the initial transaction, supporting customers as their requirements evolve."
  }
];

export const PROCESS: Titled[] = [
  {
    "title": "Consultation",
    "text": "Understand the requirement, constraints and objectives."
  },
  {
    "title": "Solution Design",
    "text": "Architect a technically sound, budget-appropriate solution."
  },
  {
    "title": "Product Sourcing",
    "text": "Identify genuine products and confirm availability."
  },
  {
    "title": "Procurement",
    "text": "Consolidated quotation, approval and order placement."
  },
  {
    "title": "Logistics",
    "text": "Consolidation, documentation, freight and customs coordination."
  },
  {
    "title": "Deployment",
    "text": "Installation, configuration, testing and handover."
  },
  {
    "title": "Support",
    "text": "Ongoing assistance, warranty coordination and expansion."
  }
];

export const SECTORS: Titled[] = [
  {
    "title": "Businesses & Enterprises",
    "text": "From growing SMEs to multi-site corporate groups requiring standardised IT estates."
  },
  {
    "title": "Government Institutions",
    "text": "Public sector procurement with documented specifications and compliant sourcing."
  },
  {
    "title": "NGOs & Development",
    "text": "Programme and donor-funded technology procurement with transparent reporting."
  },
  {
    "title": "Education",
    "text": "Schools, colleges and universities building labs, campus networks and staff computing."
  }
];

export const BRANDS: Brand[] = [
  {
    "slug": "dell",
    "name": "Dell"
  },
  {
    "slug": "hp",
    "name": "HP"
  },
  {
    "slug": "lenovo",
    "name": "Lenovo"
  },
  {
    "slug": "cisco",
    "name": "Cisco"
  },
  {
    "slug": "ubiquiti",
    "name": "Ubiquiti"
  },
  {
    "slug": "fortinet",
    "name": "Fortinet"
  },
  {
    "slug": "tplink",
    "name": "TP-Link"
  },
  {
    "slug": "netgear",
    "name": "NETGEAR"
  },
  {
    "slug": "mikrotik",
    "name": "MikroTik"
  },
  {
    "slug": "seagate",
    "name": "Seagate"
  },
  {
    "slug": "synology",
    "name": "Synology"
  },
  {
    "slug": "qnap",
    "name": "QNAP"
  },
  {
    "slug": "kingstontechnology",
    "name": "Kingston"
  },
  {
    "slug": "samsung",
    "name": "Samsung"
  },
  {
    "slug": "intel",
    "name": "Intel"
  },
  {
    "slug": "amd",
    "name": "AMD"
  },
  {
    "slug": "nvidia",
    "name": "NVIDIA"
  },
  {
    "slug": "asus",
    "name": "ASUS"
  },
  {
    "slug": "acer",
    "name": "Acer"
  },
  {
    "slug": "supermicro",
    "name": "Supermicro"
  },
  {
    "slug": "vmware",
    "name": "VMware"
  },
  {
    "slug": "veeam",
    "name": "Veeam"
  },
  {
    "slug": "schneiderelectric",
    "name": "Schneider Electric"
  },
  {
    "slug": "epson",
    "name": "Epson"
  }
];

export const SOCIALS: Social[] = [
  {
    "slug": "facebook",
    "name": "Facebook",
    "url": "https://www.facebook.com/jardinetechnologies"
  },
  {
    "slug": "instagram",
    "name": "Instagram",
    "url": "https://www.instagram.com/jardinetechnologies"
  },
  {
    "slug": "tiktok",
    "name": "TikTok",
    "url": "https://www.tiktok.com/@jardinetechnologies"
  },
  {
    "slug": "whatsapp",
    "name": "WhatsApp",
    "url": "https://wa.me/601120730446"
  }
];

export const COMMERCIAL: Pair[] = [
  {
    "label": "Pricing",
    "value": "Quoted per requirement — volume and project pricing available"
  },
  {
    "label": "Minimum order",
    "value": "Single unit; tiered pricing typically from 5 units"
  },
  {
    "label": "Condition",
    "value": "Brand new, factory sealed, genuine manufacturer stock"
  },
  {
    "label": "Sourcing route",
    "value": "Malaysia and Dubai distribution channels"
  },
  {
    "label": "Delivery terms",
    "value": "EXW, CIF or DDP — quoted to your destination"
  },
  {
    "label": "Documentation",
    "value": "Commercial invoice, packing list and certificate of origin"
  },
  {
    "label": "Lead time",
    "value": "Typically 1-4 weeks depending on configuration and destination"
  },
  {
    "label": "Services available",
    "value": "Installation, configuration, imaging, asset tagging and handover training"
  }
];

export const TEAM: TeamMember[] = [
  {
    "name": "Full Name",
    "role": "Managing Director",
    "photo": null,
    "bio": "Leads company strategy, key client relationships and the Malaysia-Dubai-Africa supply partnerships.",
    "email": "Jardinetechnologies@gmail.com",
    "linkedin": ""
  },
  {
    "name": "Full Name",
    "role": "Head of Technology Solutions",
    "photo": null,
    "bio": "Owns solution design, from requirement gathering and sizing through to the final bill of materials.",
    "email": "Jardinetechnologies@gmail.com",
    "linkedin": ""
  },
  {
    "name": "Full Name",
    "role": "Procurement & Supply Chain Manager",
    "photo": null,
    "bio": "Manages authorised distribution channels, pricing, stock availability and manufacturer relationships.",
    "email": "Jardinetechnologies@gmail.com",
    "linkedin": ""
  },
  {
    "name": "Full Name",
    "role": "Logistics & Trade Compliance Lead",
    "photo": null,
    "bio": "Coordinates freight, customs documentation and Incoterms so shipments clear cleanly at destination.",
    "email": "Jardinetechnologies@gmail.com",
    "linkedin": ""
  },
  {
    "name": "Full Name",
    "role": "Regional Manager - Africa",
    "photo": null,
    "bio": "First point of contact for clients across the continent, from first enquiry to on-site handover.",
    "email": "Jardinetechnologies@gmail.com",
    "linkedin": ""
  },
  {
    "name": "Full Name",
    "role": "Technical Services Engineer",
    "photo": null,
    "bio": "Handles installation, configuration, imaging and post-deployment support for delivered infrastructure.",
    "email": "Jardinetechnologies@gmail.com",
    "linkedin": ""
  }
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

/** Stable catalogue reference, e.g. JT-BUSL-101 */
export function productRef(p: Product): string {
  const initials = p.slug
    .split('-')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 4)
    .toUpperCase();
  const n = 100 + PRODUCTS.findIndex((x) => x.slug === p.slug) + 1;
  return `JT-${initials}-${n}`;
}

/** The three gallery images generated for each product. */
export const productImages = (p: Product) =>
  [1, 2, 3].map((i) => `/img/products/${p.slug}-${i}.webp`);

export const VIEW_LABELS = ['Main view', 'Detail view', 'In use'];
