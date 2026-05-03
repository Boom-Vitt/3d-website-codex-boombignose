import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Cpu,
  GraduationCap,
  Mail,
  Network,
  Play,
  Rocket,
  Users,
  Workflow,
} from 'lucide-react';
import * as THREE from 'three';
import './styles.css';

const sources = [
  {
    label: 'Official site',
    detail: 'boombignose.tech',
    href: 'https://boombignose.tech/',
  },
  {
    label: 'Community',
    detail: 'Skool BoomBigNose+',
    href: 'https://www.skool.com/boombignose-8034',
  },
  {
    label: 'Links',
    detail: '@BoomBigNose Linktree',
    href: 'https://linktr.ee/boombignose',
  },
];

const expertise = [
  ['n8n Automation', 'สอน workflow อัตโนมัติ, Gmail, Sheets, AI tools และ MCP'],
  ['AI Integration', 'เชื่อม LLM, RAG, prompt systems และ workflow orchestration'],
  ['Product Delivery', 'พัฒนา AI product ตั้งแต่ research, API, cloud จนถึง mobile release'],
  ['Learning Content', 'ทำ tutorial สำหรับผู้เริ่มต้นจนถึงคนที่ต้องการ deploy ใช้งานจริง'],
];

const projects = [
  {
    title: 'EduBuddy (MU Chat)',
    type: 'AI Campus Assistant',
    body: 'AI chatbot สำหรับบริบทมหาวิทยาลัยมหิดล ใช้แนวคิด LLM/RAG และระบบ backend สำหรับตอบคำถามเชิงสถาบัน',
    tags: ['LLM', 'RAG', 'FastAPI', 'React'],
  },
  {
    title: 'Brain Computer Interface Lab',
    type: 'Research Impact',
    body: 'งานด้าน EEG, CT/MRI classification และโมเดล CNN/Transformer สำหรับ use case ทางการแพทย์',
    tags: ['PyTorch', 'CNN', 'Transformer', 'Medical AI'],
  },
  {
    title: 'Salayte Hashery Mobile App',
    type: 'Consumer Mobile',
    body: 'แอปมือถือที่ดูแลวงจรการพัฒนาจนถึง App Store deployment และ TestFlight workflow',
    tags: ['Flutter', 'Dart', 'Supabase', 'CI/CD'],
  },
  {
    title: 'Map Analytics Platform',
    type: 'Business Intelligence',
    body: 'แพลตฟอร์ม geospatial analytics สำหรับ site selection และ traffic analysis',
    tags: ['Next.js', 'PostGIS', 'Google API', 'Prisma'],
  },
];

function AutomationScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0.8, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    const tealLight = new THREE.PointLight(0x35d6c6, 55, 18);
    tealLight.position.set(-4, 3, 4);
    const amberLight = new THREE.PointLight(0xf6b84b, 35, 16);
    amberLight.position.set(4, -2, 5);
    scene.add(ambient, tealLight, amberLight);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.34, 2);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x35d6c6,
      emissive: 0x0b7e79,
      emissiveIntensity: 0.32,
      metalness: 0.35,
      roughness: 0.28,
    });
    const amberMaterial = new THREE.MeshStandardMaterial({
      color: 0xffbd59,
      emissive: 0x8a4c00,
      emissiveIntensity: 0.28,
      metalness: 0.28,
      roughness: 0.34,
    });

    const points = [
      [-2.8, 1.1, 0.2],
      [-1.35, -0.95, -0.5],
      [0.35, 1.35, 0.45],
      [1.7, -0.2, -0.85],
      [2.75, 1.0, 0.1],
      [0.1, -1.55, 0.35],
    ];

    const nodes = points.map((position, index) => {
      const mesh = new THREE.Mesh(nodeGeometry, index % 2 ? amberMaterial : nodeMaterial);
      mesh.position.set(...position);
      mesh.userData.baseY = position[1];
      mesh.userData.offset = index * 0.75;
      group.add(mesh);
      return mesh;
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6fe8df,
      transparent: true,
      opacity: 0.55,
    });

    for (let index = 0; index < points.length - 1; index += 1) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(...points[index]),
        new THREE.Vector3(
          (points[index][0] + points[index + 1][0]) / 2,
          (points[index][1] + points[index + 1][1]) / 2 + 0.45,
          0.65,
        ),
        new THREE.Vector3(...points[index + 1]),
      ]);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(36));
      group.add(new THREE.Line(geometry, lineMaterial));
    }

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0xe9fffb,
        emissive: 0x39d9cf,
        emissiveIntensity: 0.52,
        metalness: 0.12,
        roughness: 0.2,
      }),
    );
    core.position.set(-0.25, 0.1, 0.2);
    group.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.28, 0.018, 12, 120),
      new THREE.MeshBasicMaterial({ color: 0xffca68, transparent: true, opacity: 0.78 }),
    );
    ring.rotation.x = Math.PI / 2.7;
    group.add(ring);

    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          Array.from({ length: 420 }, () => (Math.random() - 0.5) * 9),
          3,
        ),
      ),
      new THREE.PointsMaterial({
        color: 0xb8fff8,
        size: 0.018,
        transparent: true,
        opacity: 0.52,
      }),
    );
    scene.add(particles);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      if (!prefersReduced) {
        group.rotation.y = Math.sin(time * 0.35) * 0.28;
        group.rotation.x = Math.sin(time * 0.24) * 0.08;
        core.scale.setScalar(1 + Math.sin(time * 2.1) * 0.035);
        ring.rotation.z = time * 0.52;
        particles.rotation.y = time * 0.025;
        nodes.forEach((node) => {
          node.position.y = node.userData.baseY + Math.sin(time * 1.6 + node.userData.offset) * 0.12;
          node.rotation.x = time * 0.55 + node.userData.offset;
          node.rotation.y = time * 0.72;
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      amberMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <div className="scene" ref={mountRef} aria-label="3D automation workflow animation" />;
}

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BoomBigNose home">
          <span className="brand-mark">BN</span>
          <span>BoomBigNose</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#profile">Profile</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="small-label">Vittawat Sootawee</p>
          <h1>AI Automation educator turning repeated work into living workflows.</h1>
          <p className="lead">
            BoomBigNose สอน n8n, AI Agent Automation และการเชื่อมเครื่องมือทำงานจริง
            สำหรับ creator, founder และทีมที่อยากลดงานซ้ำด้วยระบบอัตโนมัติ
          </p>
          <div className="hero-actions">
            <a className="button primary" href="https://linktr.ee/boombignose" target="_blank" rel="noreferrer">
              <Play size={18} />
              Learn with BoomBigNose
            </a>
            <a className="button ghost" href="#projects">
              <ArrowUpRight size={18} />
              View projects
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <AutomationScene />
          <div className="status-panel">
            <div>
              <span>Active Stack</span>
              <strong>n8n + AI Agents + MCP</strong>
            </div>
            <Workflow size={22} />
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Profile highlights">
        <article>
          <GraduationCap size={24} />
          <strong>YouTube Educator</strong>
          <span>tutorials for automation and AI tools</span>
        </article>
        <article>
          <Network size={24} />
          <strong>n8n Expert</strong>
          <span>workflow automation for practical teams</span>
        </article>
        <article>
          <Users size={24} />
          <strong>BoomBigNose+</strong>
          <span>community for AI + Automation learning</span>
        </article>
      </section>

      <section className="section split" id="profile">
        <div>
          <p className="small-label">Profile</p>
          <h2>Where AI research meets real-world deployment.</h2>
        </div>
        <div className="profile-copy">
          <p>
            จากข้อมูลสาธารณะ BoomBigNose คือแบรนด์ของ Vittawat Sootawee ที่โฟกัสการสอน
            AI Automation, n8n และการสร้าง workflow ที่นำไปใช้กับงานจริงได้ทันที
          </p>
          <p>
            โปรไฟล์ทางการระบุงานด้าน AI, full-stack, mobile, cloud, data analytics
            และโปรเจกต์ตั้งแต่ EdTech, medical AI ไปจนถึง geospatial analytics
          </p>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-heading">
          <p className="small-label">Technical Focus</p>
          <h2>From prompt to production workflow.</h2>
        </div>
        <div className="skill-grid">
          {expertise.map(([title, body], index) => (
            <article className="skill-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="small-label">Selected Work</p>
          <h2>Production-ready ideas across learning, research, and tools.</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.title}>
              <div>
                <span>{project.type}</span>
                <h3>{project.title}</h3>
              </div>
              <p>{project.body}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div>
          <p className="small-label">Contact & Sources</p>
          <h2>Start from the official channels.</h2>
          <p>
            หน้าเว็บนี้สรุปจากข้อมูลที่ค้นได้แบบสาธารณะ และตั้งใจทำให้แก้ไขต่อได้ง่าย
            หากต้องการเพิ่มรูปจริง วิดีโอ หรือ testimonial ภายหลัง
          </p>
        </div>
        <div className="source-list">
          {sources.map((source) => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.label}>
              <span>{source.label}</span>
              <strong>{source.detail}</strong>
              <ArrowUpRight size={18} />
            </a>
          ))}
          <a href="mailto:vittawat.soo@gmail.com">
            <span>Email</span>
            <strong>vittawat.soo@gmail.com</strong>
            <Mail size={18} />
          </a>
          <a href="https://github.com/Boom-Vitt" target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>github.com/Boom-Vitt</strong>
            <Cpu size={18} />
          </a>
        </div>
      </section>

      <footer>
        <span>BoomBigNose profile site</span>
        <span>Built with Vite, React, Three.js</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
