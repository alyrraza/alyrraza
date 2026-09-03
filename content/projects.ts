import { Project } from "@/types";

const SWE_TAG = "SWE (AI/MLOps)";

export const projects: Project[] = [
  // ---------- RESEARCH LENS ----------
  {
    slug: "radguard",
    title: "RadGuard (Final Year Project)",
    tagline: "Catching AI hallucinations in radiology reports before they reach patients.",
    descriptions: {
      research:
        "RadGuard is a multimodal deep learning system that detects four classes of error, supported, hallucinated, missing, and inaccurate, in AI generated chest X-ray reports across 14 conditions. V11 uses BioViL-T and CXR-BERT encoders jointly pretrained on MIMIC-CXR, fused through bidirectional cross-attention, reaching 0.66 macro F1 after fixing a patient level data leakage bug present in every earlier version.",
      engineering:
        "A FastAPI and PyTorch inference service deployed on HuggingFace Spaces (Docker SDK), paired with a React 18 and Vite frontend and a MongoDB backed partner API, all orchestrated through Docker Compose. Model versioning runs through MLflow, with weights hosted on the HuggingFace Hub and auto downloaded at inference time.",
    },
    lenses: ["research", "engineering"],
    tags: [SWE_TAG, "Medical AI", "Multimodal", "Computer Vision", "NLP", "PyTorch", "FastAPI", "MLOps"],
    status: ["live", "screenshots"],
    links: {
      github: "https://github.com/alyrraza/RadGuard-Medical-AI",
      liveDemo: "https://radguard.vercel.app/",
      huggingFace: "https://huggingface.co/spaces/alyrraza/radguard-demo",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/radguard/thumbnail.png",
      caption: "RadGuard overview poster",
    },
    media: [
      { type: "diagram", src: "/screenshots/radguard/architecture.jpg", caption: "V11 bidirectional cross-attention architecture" },
      { type: "image", src: "/screenshots/radguard/landing-page.jpg", caption: "radguard.vercel.app landing page" },
      { type: "image", src: "/screenshots/radguard/frontend-analyze.jpg", caption: "Live inference frontend: ELRRs score and attention heatmap" },
      { type: "image", src: "/screenshots/radguard/frontend-results.jpg", caption: "Per-sentence error verdicts and active conditions" },
      { type: "image", src: "/screenshots/radguard/attention-heatmaps.jpg", caption: "Visual grounding heatmaps across conditions" },
      { type: "image", src: "/screenshots/radguard/evaluation-dashboard.jpg", caption: "Evaluation dashboard: ground truth vs. prediction" },
    ],
    details: {
      research: [
        "Designed a multimodal architecture pairing BioViL-T (image) and CXR-BERT (text) encoders, both pretrained on MIMIC-CXR so the two modalities already share an aligned feature space before fusion.",
        "Built bidirectional cross-attention with 14 condition-specific heads: a text-to-image direction that grounds each finding to its spatial image regions, and an image-to-text direction that grounds image content back to report tokens.",
        "Fused modalities through an MLP-Mixer layer combined with match-type embeddings and CheXbert-derived condition labels, feeding a multi-task head that jointly predicts error classification, visual grounding, and image-only finding detection.",
        "Root-caused a patient-level data leakage bug present across five prior model versions by tracing it to random row-level splitting, then fixed it with a stratified split by patient study ID, the single change that lifted macro F1 from 0.5643 to 0.6600 (V11).",
        "Designed the ELRRs (error-adjusted report reliability score), a novel 0 to 100 clinical severity-weighted scoring methodology that turns four raw error classes into a single triage signal.",
        "Iterated across 11 model versions, isolating the effect of encoder choice, attention direction, loss weighting, and image resolution on macro F1 through controlled ablations.",
      ],
      engineering: [
        "Shipped a FastAPI inference service (/analyze endpoint) running PyTorch 2.x with automatic mixed precision, containerized and deployed on HuggingFace Spaces (Docker SDK, 2 vCPU / 16GB RAM).",
        "Built a three-service architecture, a React 18 and Vite frontend, a FastAPI and MongoDB partner backend, and the FastAPI AI engine, orchestrated together with Docker Compose and nginx.",
        "Set up a model registry with MLflow (SQLite backend) for experiment tracking, and hosted production weights on the HuggingFace Hub with automatic download at inference startup.",
        "Designed the public API contract: multipart form-data upload in, structured JSON out (per-condition verdicts, confidence scores, heatmap URLs, ELRRs score), testable through a standalone frontend-test.html harness.",
        "Trained the production model on a rented RTX 5090 (33.7GB VRAM) via Vast.ai, then fed the resulting checkpoint into the same MLflow-versioned deployment pipeline used for every release.",
        "Deployed and iterated across 8 shipped versions without downtime to the public demo, each release swapped in behind the same stable API contract.",
      ],
    },
    results: [
      { label: "Macro F1 (V11)", value: "0.6600" },
      { label: "Conditions covered", value: "14" },
      { label: "Training samples", value: "74,060" },
      { label: "Unique studies", value: "30,633" },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "e2e-varnet-mri-reconstruction",
    title: "E2E-VarNet MRI Reconstruction",
    tagline: "A rigorously honest reproduction of E2E-VarNet, plus a free signal that knows when it's out of its depth.",
    descriptions: {
      research:
        "A reproduction of E2E-VarNet (Sriram et al., MICCAI 2020) for 4x-accelerated single-coil knee MRI reconstruction, extended with three honestly measured studies: a cascade-depth robustness check, a checkpoint-ensemble uncertainty signal, and a self-supervised test-time adaptation experiment. Every claim is stress-tested with volume-level bootstrap confidence intervals to correct for pseudoreplication, and two of the project's own headline results were revised or withdrawn once the corrected statistics no longer supported them. The strongest finding: checkpoint-ensemble uncertainty rises 1.54x, 95% CI [1.35x, 1.74x], on out-of-distribution brain scans, a free, universally computable drift signal.",
      engineering:
        "A production inference stack: a Gradio and FastAPI service on a HuggingFace Space (ZeroGPU), serving a K=2 checkpoint-ensemble model behind a REST endpoint, called by a React, Vite, and Tailwind frontend deployed on Vercel. Drift detection is wired end to end, an uncertainty threshold flags out-of-distribution scans directly in the API response, backed by an Evidently AI monitor, Prometheus and Grafana dashboards, and a GitHub Actions quality gate that blocks regressions below a baseline-relative SSIM threshold.",
    },
    lenses: ["research", "engineering"],
    tags: [SWE_TAG, "Medical Imaging", "MRI Reconstruction", "PyTorch", "Uncertainty Estimation", "MLOps"],
    status: ["live", "screenshots"],
    links: {
      github: "https://github.com/alyrraza/e2e-varnet-mri-reconstruction",
      liveDemo: "https://e2e-varnet-mri-reconstruction.vercel.app/",
      huggingFace: "https://huggingface.co/spaces/alyrraza/e2e-varnet-api",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/e2e-varnet-mri-reconstruction/thumbnail.png",
      caption: "E2E-VarNet MRI reconstruction overview poster",
    },
    media: [
      { type: "image", src: "/screenshots/e2e-varnet-mri-reconstruction/live-demo.jpg", caption: "Live demo frontend: e2e-varnet-mri-reconstruction.vercel.app" },
      { type: "diagram", src: "/screenshots/e2e-varnet-mri-reconstruction/qualitative-comparison.png", caption: "Worst, median, and best-case reconstructions vs ground truth (T=8)" },
      { type: "diagram", src: "/screenshots/e2e-varnet-mri-reconstruction/gap1-gap2-summary.png", caption: "GAP 1 (cascade depth vs OOD SSIM) and GAP 2 (uncertainty vs error) summary" },
      { type: "diagram", src: "/screenshots/e2e-varnet-mri-reconstruction/convergence.png", caption: "Training convergence: T=4 vs T=6" },
      { type: "diagram", src: "/screenshots/e2e-varnet-mri-reconstruction/gap3-tta-summary.png", caption: "GAP 3: self-supervised test-time adaptation trajectories (negative result)" },
    ],
    details: {
      research: [
        "Reproduced E2E-VarNet end to end from the official fastMRI codebase for 4x-accelerated single-coil knee reconstruction (SSIM 0.7594 to 0.7607 across T=4/6/8 vs 0.7453 zero-filled baseline).",
        "Built a K=2 checkpoint-ensemble uncertainty signal and showed it rises 1.54x, bootstrap 95% CI [1.35x, 1.74x], p=4.46e-6, on out-of-distribution brain scans, with full coverage on 15 of 15 test volumes, unlike a numerically stronger but incomplete-coverage eSNR baseline.",
        "Ran a cascade-depth-vs-robustness study and reported it honestly as a near-null result once foreground-masked SSIM, PSNR, and NMSE all came back flat, withdrawing the original deeper-generalizes-better hypothesis.",
        "Tested self-supervised LoRA test-time adaptation and reported a controlled negative result, confirmed with a positive in-domain control to rule out domain shift as the cause.",
        "Caught and fixed a pseudoreplication bug across every reported statistic, re-deriving all correlations and significance tests at the volume level via block bootstrap, which materially weakened two of the project's own headline claims.",
        "Diagnosed a coil-combination phase-cancellation bug in the synthetic brain pipeline using a zero-model-baseline sanity check, the same technique that caught a second, missing-normalization bug.",
      ],
      engineering: [
        "Deployed inference as a Gradio 5 and FastAPI service on a HuggingFace Space with ZeroGPU, exposing POST /reconstruct and GET /health endpoints called by a separately deployed frontend.",
        "Built a React, Vite, and Tailwind frontend on Vercel that uploads a fastMRI .h5 file, calls the REST endpoint, and renders the reconstruction, uncertainty map, and metrics returned as JSON.",
        "Wired the checkpoint-ensemble uncertainty scalar into an automatic drift flag (threshold 0.018) returned directly in the API response, backed by an offline Evidently AI k-space feature-drift monitor.",
        "Stood up local observability with Prometheus and Grafana (RED metrics plus an uncertainty gauge) and an MLflow-backed experiment registry with a backfill script for historical runs.",
        "Wrote a CPU-only quality gate (pytest, no GPU required) enforcing a baseline-relative SSIM threshold, run automatically through GitHub Actions on every push.",
        "Built a resumable, checkpoint-based training loop that survived repeated session disconnects across a Kaggle-to-Vast.ai GPU migration, recovering full model, optimizer, and epoch state each time.",
      ],
    },
    results: [
      { label: "OOD drift signal", value: "1.54x" },
      { label: "Bootstrap 95% CI", value: "[1.35x, 1.74x]" },
      { label: "Knee SSIM (T=8)", value: "0.7607" },
      { label: "Brain SSIM (T=8, OOD)", value: "0.6773" },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "progressgan-cxr",
    title: "ProgressGAN-CXR",
    tagline: "Severity-conditioned GANs that simulate COVID-19 chest X-ray progression, honestly benchmarked four ways.",
    descriptions: {
      research:
        "ProgressGAN-CXR trains four severity-conditioned GAN architectures, DCGAN, WGAN-GP, Spectral DCGAN, and a knowledge-distilled (KD) generator, to synthesize COVID-19 chest X-rays along a continuous severity trajectory from Normal to COVID-19, from a single 101-dimensional input (a noise vector concatenated with a severity score). Trained on 21,165 images from the COVID-19 Radiography Database, the four models are compared on three axes: FID (visual fidelity), Spearman correlation between the severity input and a downstream classifier's predicted severity (semantic disentanglement), and SSIM across the progression sequence (temporal consistency). No single model wins every metric, DCGAN edges out FID, Spectral DCGAN dominates severity disentanglement at r=0.996, but the KD generator is the best-balanced performer across all three (FID 143.17, r=0.984, SSIM 0.963), and is the one shipped to production.",
      engineering:
        "A full-stack medical AI product: a FastAPI backend serving ONNX-quantized versions of all four generators plus a ResNet18 severity classifier, all pulled from the HuggingFace Hub at runtime, containerized with Docker and monitored through Prometheus and Grafana. The React and Tailwind frontend, deployed on Vercel, ships four interactive features: a real-time severity slider that regenerates an X-ray as it moves, a diagnostic challenge game that pits the user against the classifier, a side-by-side four-model comparison, and a research dashboard surfacing the FID, Spearman, and SSIM findings directly.",
    },
    lenses: ["research", "engineering"],
    tags: [SWE_TAG, "GANs", "Medical Imaging", "Generative Models", "PyTorch", "ONNX", "MLOps"],
    status: ["live", "screenshots"],
    links: {
      github: "https://github.com/alyrraza/ProgressGAN-CXR",
      liveDemo: "https://progressgan-cxr.vercel.app/",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/progressgan-cxr/thumbnail.png",
      caption: "ProgressGAN-CXR overview poster",
    },
    media: [
      { type: "image", src: "/screenshots/progressgan-cxr/live-demo.jpg", caption: "Live demo: progressgan-cxr.vercel.app home page" },
      { type: "diagram", src: "/screenshots/progressgan-cxr/severity-progression.png", caption: "Disease progression simulation: same noise vector, severity 0.0 (Normal) to 1.0 (COVID-19)" },
      { type: "diagram", src: "/screenshots/progressgan-cxr/four-model-comparison.png", caption: "Four-model comparison: FID, severity disentanglement (Spearman r), and temporal consistency (SSIM)" },
      { type: "diagram", src: "/screenshots/progressgan-cxr/downstream-comparison.png", caption: "Downstream classifier accuracy: real-only vs real-plus-synthetic training data" },
      { type: "diagram", src: "/screenshots/progressgan-cxr/severity-disentanglement.png", caption: "Severity disentanglement analysis: DCGAN vs WGAN-GP semantic severity encoding" },
    ],
    details: {
      research: [
        "Trained four severity-conditioned GAN architectures (DCGAN, WGAN-GP, Spectral DCGAN, KD generator) on 21,165 COVID-19 chest X-rays, each mapping a 101-dimensional noise-plus-severity vector to a 128x128 radiograph.",
        "Benchmarked all four models on three independent axes, FID, Spearman correlation for severity disentanglement, and SSIM for temporal consistency, and found no single model wins every metric.",
        "Identified the knowledge-distilled generator as the best-balanced model (FID 143.17, Spearman r 0.984, SSIM 0.963) despite Spectral DCGAN scoring higher on disentanglement alone (r=0.996), and shipped that trade-off decision to production.",
        "Tested GAN-based synthetic data augmentation on the downstream 4-class classifier and reported the honest result: a marginal 0.06 percentage-point accuracy gain (95.28% to 95.34%), not the larger improvement often claimed for synthetic augmentation.",
        "Validated severity disentanglement by correlating each model's input severity score against a downstream classifier's predicted severity across the full generated distribution, not just endpoint samples.",
      ],
      engineering: [
        "Built a FastAPI backend serving ONNX-quantized inference for all four generators and a ResNet18 classifier, with every model pulled from the HuggingFace Hub at runtime rather than bundled locally.",
        "Containerized the backend with Docker, added health checks, and instrumented Prometheus metrics on every endpoint, visualized through a Grafana dashboard.",
        "Shipped a React and Tailwind frontend on Vercel with four product surfaces: a real-time severity slider, a diagnostic challenge game, a four-model side-by-side comparison, and a research dashboard rendering the FID/Spearman/SSIM plots.",
        "Set up MLflow for model versioning and GitHub Actions CI/CD that runs tests before every deploy.",
        "Designed the API and model-loading layer so all secrets and model sources are environment-driven, no hardcoded keys or local checkpoint paths.",
      ],
    },
    results: [
      { label: "Best FID (DCGAN)", value: "142.14" },
      { label: "Best disentanglement (Spectral DCGAN, r)", value: "0.996" },
      { label: "Production model (KD) SSIM", value: "0.963" },
      { label: "Classifier accuracy", value: "95.28%" },
    ],
    featured: false,
    order: 3,
  },
  {
    slug: "cied-detection-acr2026",
    title: "CIED Detection (ACR 2026)",
    tagline: "A hybrid transformer and CNN pipeline for detecting and classifying cardiac implantable devices, accepted at ACR 2026.",
    descriptions: {
      research:
        "Generalizable Detection of Cardiac Implantable Electronic Devices Using a Hybrid Transformer and CNN Framework, co-authored with Khan MM, Ahmad F, Mansoor A, and Manzoor M, with the abstract accepted as an ePoster at the ACR 2026 Annual Meeting (American College of Radiology, Washington DC, May 2026). A three-stage pipeline detects and classifies pacemakers, ICDs, CRT-D, and CRT-P devices on chest X-rays: Stage 1 (MultiScaleDinoSeg) segments the device region using a frozen, self-supervised DINOv3 ViT-B/16 backbone with skip connections from four transformer blocks, replacing TransU-Net's ResNet-50 encoder. Stage 2a classifies manufacturer through a dual-branch architecture fusing local patch-token and global CLS-token features, and Stage 2b classifies device model through a hierarchical classifier conditioned on the predicted manufacturer. Full implementation code for all three stages is publicly available on GitHub.",
      engineering:
        "A three-stage inference pipeline built around a shared frozen DINOv3 ViT-B/16 backbone: a multi-scale segmentation decoder, a dual-branch manufacturer classifier with adaptive MLP fusion, and a hierarchical model classifier conditioned on manufacturer via a learned embedding. Class imbalance across manufacturers and device types is handled with focal loss, weighted sampling, mixup, label smoothing, and per-manufacturer SMOTE. Code for the full pipeline is publicly available on GitHub.",
    },
    lenses: ["research"],
    tags: ["Medical Imaging", "Object Detection", "Computer Vision", "Vision Transformers"],
    status: ["paper", "screenshots"],
    links: {
      github: "https://github.com/alyrraza/cied-detection-acr2026",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/cied-detection-acr2026/thumbnail.png",
      caption: "CIED Detection ACR 2026 overview poster",
    },
    media: [
      { type: "image", src: "/screenshots/cied-detection-acr2026/acr2026-acceptance.jpg", caption: "ACR 2026 abstract acceptance confirmation" },
      { type: "diagram", src: "/screenshots/cied-detection-acr2026/stage1-segmentation-arch.jpg", caption: "Stage 1: MultiScaleDinoSeg segmentation architecture" },
      { type: "diagram", src: "/screenshots/cied-detection-acr2026/stage2a-manufacturer-arch.jpg", caption: "Stage 2a: manufacturer classification architecture" },
      { type: "diagram", src: "/screenshots/cied-detection-acr2026/stage2b-model-arch.jpg", caption: "Stage 2b: hierarchical model classification architecture" },
    ],
    details: {
      research: [
        "Co-authored a three-stage detection and classification pipeline (Khan MM, Raza A, Ahmad F, Mansoor A, Manzoor M), accepted as an ePoster at the ACR 2026 Annual Meeting in Washington DC.",
        "Designed MultiScaleDinoSeg, replacing TransU-Net's ResNet-50 encoder with a frozen, self-supervised DINOv3 ViT-B/16, pulling skip connections from four transformer blocks (3, 6, 9, 12) instead of convolutional feature maps.",
        "Built a dual-branch manufacturer classifier fusing local patch-token features (DINOv3 CLS plus pooled patches, 1536d) with global full-image CLS features (512d) through adaptive MLP fusion, across five manufacturers (Abbott, Medtronic, Boston Scientific, Biotronik, St. Jude).",
        "Built a hierarchical device-model classifier (Pacemaker, ICD, CRT-D, CRT-P) conditioned on the predicted manufacturer via a learned 64-dimensional embedding, fusing DenseNet-121 and DINOv3 features to reduce cross-manufacturer confusion.",
        "Addressed severe class imbalance across manufacturers and device types with focal loss, weighted random sampling, mixup, label smoothing, and per-manufacturer SMOTE in the hybrid feature space.",
        "Full implementation code for all three pipeline stages is publicly available on GitHub.",
      ],
      engineering: [
        "Built a shared frozen DINOv3 ViT-B/16 backbone feeding three separate task heads: multi-scale segmentation, dual-branch manufacturer classification, and hierarchical model classification.",
        "Implemented adaptive MLP feature fusion across local and global branches, and a manufacturer-conditioned embedding to reduce cross-manufacturer confusion in the model classifier.",
        "Handled severe class imbalance with focal loss, weighted sampling, mixup, label smoothing, and per-manufacturer SMOTE.",
        "Full implementation code for all three pipeline stages is publicly available on GitHub.",
      ],
    },
    results: [],
    featured: false,
    order: 4,
  },
  {
    slug: "chestxray-multimodal-diagnosis",
    title: "Chest X-Ray Multi-Model Diagnosis & Explainability",
    tagline: "A medical vision-language model against general-purpose CNNs, and an honest answer about which one wins.",
    descriptions: {
      research:
        "An independent deep learning research project, my first, comparing Microsoft's BioViL-T medical vision-language model against general-purpose pretrained CNNs (DenseNet-121, ResNet-50) for multi-label disease classification on the NIH ChestX-ray14 dataset (112,120 images, 14 pathologies). Nine modeling approaches were tried and documented honestly, including the ones that failed: BioViL-T consistently underperformed because its pretraining objective targets temporal, longitudinal X-ray pairs, a mismatch with this single-timepoint dataset, diagnosed only after five failed experiments ruled out the loss function, sampler, and LoRA fine-tuning as the cause. The final ResNet-50 pipeline, tuned with per-class Youden's-J thresholds, reached a mean test AUC-ROC of about 0.73, extended with a CBAM attention module and a gradient-saliency explainability layer that localizes the top-5 predicted diseases per X-ray and validates against ground-truth bounding boxes.",
      engineering:
        "A from-scratch experimentation pipeline built entirely in Jupyter notebooks: iterative multi-label stratified splitting, custom per-class oversampling, focal loss, and threshold calibration, tracked across nine modeling attempts. The final classifier is wrapped with a CBAM attention head and a gradient-saliency explainability layer for label-free, post-hoc localization. This is a research and notebook project, not a deployed service.",
    },
    lenses: ["research"],
    tags: ["Medical Imaging", "Vision-Language Models", "Computer Vision", "NLP", "PyTorch", "Explainability"],
    status: ["screenshots"],
    links: {
      github: "https://github.com/alyrraza/chestxray-multimodal-diagnosis",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/chestxray-multimodal-diagnosis/thumbnail.png",
      caption: "Chest X-Ray Multi-Model Diagnosis & Explainability overview poster",
    },
    media: [
      { type: "diagram", src: "/screenshots/chestxray-multimodal-diagnosis/saliency-heatmap-panel.png", caption: "Saliency heatmap explainability panel: top-5 disease prediction, gradient heatmap, and bounding-box overlap check" },
      { type: "diagram", src: "/screenshots/chestxray-multimodal-diagnosis/roc-curves.png", caption: "Test-set ROC curves per pathology (ResNet-50, mean AUC approximately 0.73)" },
      { type: "diagram", src: "/screenshots/chestxray-multimodal-diagnosis/training-loss-curve.png", caption: "Training loss curve" },
    ],
    details: {
      research: [
        "Independently researched and benchmarked 9 modeling approaches across 2 model families (BioViL-T via HuggingFace and Microsoft's hi-ml-multimodal library, vs. torchxrayvision CNNs) for multi-label disease classification on NIH ChestX-ray14 (112,120 images, 14 pathologies).",
        "Diagnosed a temporal-vs-spatial architecture mismatch causing the domain-specific BioViL-T vision-language model to underperform on this single-timepoint dataset, after systematically ruling out loss function, sampler, and LoRA fine-tuning as root causes across 5 experiments.",
        "Built a multi-label preprocessing pipeline with iterative stratified splitting, custom per-class oversampling, and focal loss to handle severe class imbalance (rare classes under 0.5% prevalence).",
        "Reached a per-class test AUC-ROC of 0.56 to 0.93 (mean approximately 0.73) on the final ResNet-50 pipeline via per-class threshold calibration using the Youden's J statistic.",
        "Designed a weakly-supervised explainability pipeline (CBAM attention plus gradient-saliency heatmaps) that localizes the top-5 predicted diseases per X-ray, validated against ground-truth bounding boxes with IoU 0.46 and CNR 0.80.",
        "Published the full, honest experiment log, including the five failed BioViL-T attempts and why each one failed, rather than presenting only the final working pipeline.",
      ],
      engineering: [
        "Built a multi-label preprocessing and experimentation pipeline (iterative stratification, custom oversampling, focal loss, threshold calibration) across nine tracked modeling attempts in Jupyter notebooks.",
        "Wrapped the final classifier with a CBAM attention head and a gradient-saliency explainability layer for label-free, post-hoc localization.",
        "Research and notebook project only, no deployed service or live demo.",
      ],
    },
    results: [
      { label: "Mean test AUC-ROC", value: "~0.73" },
      { label: "AUC-ROC range", value: "0.56-0.93" },
      { label: "Localization IoU", value: "0.46" },
      { label: "Localization CNR", value: "0.80" },
    ],
    featured: false,
    order: 5,
  },
  {
    slug: "ecg-anomaly-vae",
    title: "ECG Anomaly Detection via Variational Autoencoder",
    tagline: "Unsupervised arrhythmia detection trained only on normal heartbeats.",
    descriptions: {
      research:
        "An unsupervised cardiac arrhythmia detector trained exclusively on normal ECG beats from the MIT-BIH Arrhythmia Database (48 patients, 100,840 beats). A variational autoencoder compresses each 187-point beat through an 8-dimensional latent space and is scored on reconstruction error plus KL divergence, no labeled abnormal data is needed at training time. Abnormal beats produce 2.7x higher reconstruction error than normal beats (0.0203 vs 0.0074), giving an AUROC of 0.813, competitive with a labeled Naive Bayes baseline (0.798) and a Gaussian Mixture Model (0.816) that also requires no labels. Latent-space analysis shows abnormal beats cluster in distinct regions without any label supervision, and two features used by the Naive Bayes baseline show a -0.71 correlation that violates its independence assumption, a likely reason the fully unsupervised VAE stays competitive with it.",
      engineering:
        "A TensorFlow training pipeline with an 8-dimensional VAE bottleneck (187 to 64 to 32 to 16 to z(8) encoder, mirrored decoder), MLflow experiment tracking, and evaluation against classical baselines (Naive Bayes, Gaussian Mixture Model) on identical MIT-BIH beat splits.",
    },
    lenses: ["research"],
    tags: ["Time Series", "VAEs", "Signal Processing", "Generative Models", "Anomaly Detection"],
    status: ["screenshots"],
    links: {
      github: "https://github.com/alyrraza/ECG-Anomaly-using-Variational-AutoEncoder",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/ecg-anomaly-vae/thumbnail.png",
      caption: "ECG Anomaly Detection via Variational Autoencoder overview poster",
    },
    media: [],
    details: {
      research: [
        "Trained a variational autoencoder exclusively on 75,033 normal MIT-BIH beats (no abnormal examples), reconstructing each 187-point beat through an 8-dimensional latent bottleneck (187 to 64 to 32 to 16 to z(8)).",
        "Scored anomalies as reconstruction error plus KL divergence, finding abnormal beats produce 2.7x higher reconstruction error than normal beats (0.0203 vs 0.0074).",
        "Reached AUROC 0.813 with zero labeled abnormal data, competitive with a labeled Naive Bayes baseline (0.798) and a label-free Gaussian Mixture Model (0.816).",
        "Showed via latent-space analysis that the VAE organizes beat morphology and separates abnormal from normal beats into distinct clusters without any label supervision.",
        "Identified a -0.71 correlation between two features used by the Naive Bayes baseline, a violation of its feature-independence assumption that helps explain why the unsupervised VAE stays competitive with it.",
      ],
      engineering: [
        "Built the VAE training pipeline in TensorFlow 2.19 with an 8-dimensional latent bottleneck and MLflow experiment tracking.",
        "Benchmarked against classical baselines (Naive Bayes, Gaussian Mixture Model) on identical MIT-BIH train/test splits for a fair AUROC comparison.",
      ],
    },
    results: [
      { label: "AUROC", value: "0.813" },
      { label: "Reconstruction error ratio", value: "2.7x" },
      { label: "Total beats", value: "100,840" },
      { label: "Labeled data needed", value: "None" },
    ],
    featured: false,
    order: 6,
  },
  {
    slug: "miccai-challenge",
    title: "Learn2Breath (Learn2Reg 2026 Challenge)",
    tagline: "A lung CT registration pipeline with zero trained registration weights that placed top-4 of 96 teams at MICCAI 2026.",
    descriptions: {
      research:
        "An entry to Learn2Breath, Task 2 of the Learn2Reg 2026 challenge at MICCAI 2026 (Strasbourg, France): deformable registration of inspiration and expiration lung CT pairs. The pipeline is entirely optimisation-based, no registration weights are trained at all, only a segmentation-derived feature stack feeding ConvexAdam, plus a targeted Jacobian-based folding repair. On the 10 validation pairs it reached a Lobar DSC of 0.973 and drove folding down to 0.0035% NDV, placing the submission (alyrraza) top-4 of 96 teams and earning an invitation to present at Learn2Reg 2026 and submit a full paper to the Journal of Medical Imaging.",
      engineering:
        "Ships as a single, fully deterministic Docker image with all model weights baked in at build time, verified to run end to end with --network=none. A fixed three-argument entrypoint writes a channel-first NIfTI displacement field, and the pipeline degrades gracefully through several fallback tiers so it always exits cleanly with a valid output, even under segmentation failure or tight VRAM. End-to-end runtime measured at 69.3s per pair on a Tesla T4, comfortably inside the evaluation budget.",
    },
    lenses: ["research", "engineering"],
    tags: [SWE_TAG, "Medical Imaging", "Image Registration", "Computer Vision", "PyTorch", "Docker"],
    status: ["screenshots"],
    links: {},
    thumbnail: {
      type: "image",
      src: "/screenshots/miccai-challenge/thumbnail.png",
      caption: "Learn2Reg 2026: Medical Image Registration Challenge at MICCAI 2026, Strasbourg",
      fit: "contain",
    },
    media: [
      { type: "image", src: "/screenshots/miccai-challenge/thumbnail.png", caption: "Learn2Reg 2026: Medical Image Registration Challenge at MICCAI 2026, Strasbourg" },
      { type: "image", src: "/screenshots/miccai-challenge/validation-leaderboard.jpg", caption: "Learn2Breath validation leaderboard: alyrraza ranked #4 of 96 teams (combined score 0.99151, Lobar DSC 0.99264, folding 0.11326%)" },
      { type: "image", src: "/screenshots/miccai-challenge/invitation-email.jpg", caption: "Organizer invitation to present: top-4 finish earns an oral presentation and poster slot at Learn2Reg 2026" },
    ],
    details: {
      research: [
        "Built an entirely optimisation-based registration pipeline for the Learn2Breath (lung CT inspiration/expiration) task, no registration weights are trained, the only learned component is off-the-shelf TotalSegmentator lung lobe segmentation.",
        "Fed a multi-channel feature stack, MIND-SSC descriptors (r=1, d=2), inverse-frequency-weighted one-hot lobe labels, and derived inter-lobe fissure boundary channels blurred with a 5x5x5 average pool, into ConvexAdam: discrete correlation (30mm capture range) into coupled convex optimisation into inverse consistency into 120-iteration Adam instance optimisation with diffusion regularisation.",
        "Designed a folding repair step that computes a full-resolution Jacobian and locally smooths only voxels inside a small dilation of the folded set, iterating until %NDV drops below the challenge's 0.005% threshold while leaving non-folded regions untouched (mean DSC cost of only -0.00025).",
        "Reached Lobar DSC 0.97276 +/- 0.00394 and %NDV 0.00350 +/- 0.00070 (max 0.00395) on the 10 validation pairs, below the practical-equivalence threshold on every subject, down from a raw 1.33% +/- 1.48% before folding repair.",
        "Reported the method's determinism honestly: no random seeds are drawn anywhere, but TotalSegmentator's cuDNN kernels have a non-guaranteed floating-point summation order, so segmentation output can vary by a small number of voxels between runs, a caveat stated rather than hidden.",
        "Placed top-4 of 96 teams and 1,137 submissions on the validation-phase leaderboard, rank #3 at the time of the organizers' invitation and #4 as of the latest snapshot, separated from 3rd place by 0.00016 in combined score, invited to give an oral presentation and poster at the Learn2Reg 2026 event at MICCAI 2026 (Strasbourg, October 1) and to submit a full paper to the Journal of Medical Imaging's Special Section on Deformable Image Registration.",
      ],
      engineering: [
        "Packaged the full pipeline into a single Docker image with all TotalSegmentator weights baked in at build time, verified to run end to end with --network=none for the evaluation environment's no-internet constraint.",
        "Defined a fixed three-argument ENTRYPOINT contract (fixed inspiration CT, moving expiration CT, output path) writing a channel-first float32 NIfTI displacement field on the fixed image's grid at 1.5mm spacing.",
        "Layered the pipeline with fallbacks so it always exits cleanly with a valid, correctly shaped output: MIND-SSC-only registration with an HU-threshold lung box if segmentation fails or returns fewer than 3 of 5 lobes, one retry if that also raises, and a zero displacement field as a last resort.",
        "Added a pre-flight VRAM check that shrinks the discrete search radius automatically when less than 10GB is free, so the container can't fail with an out-of-memory error on constrained hardware.",
        "Kept the full pipeline deterministic end to end, with the Adam instance optimisation initialised from the deterministic coupled-convex solution and run for a fixed iteration count, and bounded the folding-repair stage with a 30s wall-clock cap.",
        "Measured 69.3 +/- 1.3s end-to-end runtime per pair on a Tesla T4 (53.1s segmentation, 7.5s registration, 1.4s folding repair), with a 72.3s worst case across the 10 validation pairs.",
      ],
    },
    results: [
      { label: "Validation rank", value: "#4 of 96 teams" },
      { label: "Lobar DSC (5 lobes)", value: "0.973" },
      { label: "%NDV (post-repair)", value: "0.0035%" },
      { label: "Runtime per pair (T4)", value: "69.3s" },
    ],
    featured: true,
    order: 7,
  },

  // ---------- ENGINEERING LENS ----------
  {
    slug: "inference-benchmark-mlops",
    title: "InferBench",
    tagline: "TensorRT cut GPU latency 5.6x. A Redis cache cut repeat requests 2,377x. Every number is a real, reproducible measurement.",
    descriptions: {
      research:
        "A systematic hardware-tradeoff study of inference backends (PyTorch, ONNX Runtime, TensorRT, TorchScript) for a Vision Transformer across GPU and CPU, showing the fastest backend depends entirely on the deployment hardware rather than any single backend being universally faster. Every optimized backend was verified to produce identical predictions to the baseline on a held-out validation set before any speedup number was reported.",
      engineering:
        "InferBench benchmarks a Vision Transformer (ViT-Base) across PyTorch, ONNX Runtime, and TensorRT on GPU, and across PyTorch, ONNX Runtime, and TorchScript on CPU, then serves it through a FastAPI backend with a from-scratch dynamic batching layer (asyncio.Queue and asyncio.Future, no batching library), a Redis response cache, PostgreSQL request logging, and a Prometheus and Grafana observability stack, all orchestrated with Docker Compose and tested via GitHub Actions CI against real Redis and PostgreSQL service containers. TensorRT FP16 delivered a 2.9x to 5.6x GPU speedup over PyTorch with 100% prediction match on a 100-sample validation set; the Redis cache cut a 1,996.88ms cache-miss request to 0.84ms, a 2,377x speedup, verified end to end. On CPU-only hardware, the honest result reversed: plain PyTorch eager mode beat both ONNX Runtime and TorchScript at every batch size, reported as measured rather than assumed.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "MLOps", "Inference Optimization", "ONNX", "TensorRT", "FastAPI", "Observability"],
    status: ["screenshots"],
    links: {
      github: "https://github.com/alyrraza/inference-benchmark-mlops",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/inference-benchmark-mlops/thumbnail.png",
      caption: "InferBench overview poster",
    },
    media: [
      { type: "diagram", src: "/screenshots/inference-benchmark-mlops/architecture.jpg", caption: "System architecture: FastAPI, dynamic batching, Redis, PostgreSQL, Prometheus, Grafana" },
      { type: "diagram", src: "/screenshots/inference-benchmark-mlops/sequence-diagram.jpg", caption: "Request lifecycle: cache check, async batching window, fan-out, and metrics logging" },
      { type: "image", src: "/screenshots/inference-benchmark-mlops/frontend-prediction.png", caption: "Local demo frontend: live prediction with cache status and latency" },
      { type: "image", src: "/screenshots/inference-benchmark-mlops/grafana-dashboard.png", caption: "Live Grafana dashboard: request latency, throughput, and cache hit rate" },
    ],
    details: {
      research: [
        "Benchmarked the same Vision Transformer on both GPU (PyTorch, ONNX Runtime, TensorRT) and CPU (PyTorch, ONNX Runtime, TorchScript) and found the fastest backend flips entirely depending on the hardware, reported as measured rather than assumed.",
        "Verified every optimized backend produced identical predictions to the baseline on a 100-sample validation set before reporting any speedup number.",
      ],
      engineering: [
        "Benchmarked ViT-Base (86M parameters) across PyTorch, ONNX Runtime, and TensorRT FP16 on an NVIDIA T4 GPU across batch sizes 1 to 16 with full p50/p95/p99 latency, TensorRT delivered a 2.9x to 5.6x speedup while matching 100% of predictions on a 100-sample validation set.",
        "Ran a matching CPU-only benchmark and found the honest, counter-intuitive result: plain PyTorch eager mode beat both ONNX Runtime and TorchScript at every batch size, the opposite of the GPU result.",
        "Built a dynamic request-batching layer entirely from scratch using asyncio.Queue and asyncio.Future (no batching library), collecting requests in a 10ms window and fanning results back out per caller, verified under real concurrent load (20 simultaneous requests forming actual batches of size 2 and 16).",
        "Built a Redis response cache keyed on image-content hash plus backend, with graceful degradation if Redis is unreachable, verified end to end with a 2,377x latency reduction (1,996.88ms cache miss to 0.84ms cache hit).",
        "Logged every request's backend, cache status, batch size, prediction, and latency to PostgreSQL, and instrumented Prometheus and Grafana with custom latency histograms and a version-controlled, auto-provisioned dashboard.",
        "Wired a GitHub Actions CI pipeline running automated tests against real Redis and PostgreSQL service containers on every push, with the full stack deployable via a single Docker Compose command.",
      ],
    },
    results: [
      { label: "GPU speedup (TensorRT FP16)", value: "up to 5.6x" },
      { label: "Cache speedup", value: "2,377x" },
      { label: "Prediction match", value: "100%" },
      { label: "Max verified batch size", value: "16" },
    ],
    featured: true,
    order: 8,
  },
  {
    slug: "retailsense-ai",
    title: "RetailSense AI",
    tagline: "A demand-forecasting platform for a 54-store grocery chain, deployed twice over: Docker Compose and Kubernetes.",
    // NOTE: the AWS EC2 instance backing the live demo has since been stopped; github + screenshots only.
    descriptions: {
      research:
        "A model-selection study comparing LightGBM, XGBoost, and ARIMA for retail demand forecasting via a paired t-test on MAE rather than picking a winner by eyeballing metrics, with SHAP used to confirm the winning model's feature importances (month, cluster, transactions, rolling averages, promotions) match real retail intuition rather than spurious correlations.",
      engineering:
        "RetailSense AI is a production-grade MLOps platform forecasting daily demand across 54 stores and 33 product families for Corporacion Favorita, an Ecuadorian grocery chain. Twenty-one tracked MLflow runs compare LightGBM, XGBoost, and an ARIMA baseline; LightGBM wins a paired t-test A/B comparison (p=0.0036) at RMSE 336, MAE 230, MAPE 8.78%, a 55% RMSE improvement over the ARIMA baseline, and is registered as the production model. A FastAPI backend exposes forecast, segmentation (K-Means/GMM), SHAP explainability, A/B-test, and drift-detection endpoints, served through a React and Recharts dashboard behind Nginx. The full stack, FastAPI, React, MLflow, PostgreSQL, MinIO, was deployed twice over on the same AWS EC2 instance: once via Docker Compose and once via Kubernetes (Minikube). That EC2 instance has since been stopped, the project is presented here through its GitHub repo and screenshots.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "MLOps", "Forecasting", "FastAPI", "Kubernetes", "MLflow", "React"],
    status: ["screenshots"],
    links: {
      github: "https://github.com/alyrraza/retailsense-ai",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/retailsense-ai/thumbnail.png",
      caption: "RetailSense AI overview poster",
    },
    media: [
      { type: "image", src: "/screenshots/retailsense-ai/live-dashboard.jpg", caption: "Live dashboard on AWS EC2" },
      { type: "image", src: "/screenshots/retailsense-ai/forecast-input.jpg", caption: "Forecast input form" },
      { type: "image", src: "/screenshots/retailsense-ai/forecast-result.jpg", caption: "Forecast prediction: 2,486 units, 95% CI [1,827, 3,146], LightGBM" },
      { type: "diagram", src: "/screenshots/retailsense-ai/shap-explainability.jpg", caption: "SHAP feature importance explainability" },
      { type: "diagram", src: "/screenshots/retailsense-ai/ab-test.jpg", caption: "A/B test: LightGBM vs XGBoost paired t-test" },
      { type: "diagram", src: "/screenshots/retailsense-ai/mlflow-rmse-comparison.jpg", caption: "MLflow: RMSE comparison across 21 tracked runs" },
    ],
    details: {
      research: [
        "Selected the production model through a paired t-test A/B comparison on MAE rather than picking the lowest single-run error, confirming LightGBM's edge over XGBoost was statistically significant (p=0.0036).",
        "Validated the winning model with SHAP feature importances (month, cluster, transactions, rolling averages, promotions) to confirm it relies on retail-plausible signals rather than spurious correlations.",
      ],
      engineering: [
        "Built a full feature-engineering pipeline (lag features, rolling statistics, date decomposition, holiday and oil-price encoding, store clustering) over 4+ years of daily sales across 54 stores and 33 product families.",
        "Tracked 21 MLflow runs across LightGBM, XGBoost, ARIMA, K-Means, and GMM, selecting the production model through a paired t-test on MAE (p=0.0036) rather than a single-run comparison.",
        "Registered LightGBM (RMSE 336.33, MAE 229.67, MAPE 8.78%) as the production model, a 55% RMSE improvement over the ARIMA baseline (RMSE 740.71).",
        "Exposed forecast, segmentation, SHAP explainability, A/B-test, and KS-test drift-detection endpoints through a FastAPI backend, with a React and Recharts dashboard behind Nginx.",
        "Deployed the same 5-service stack (frontend, backend, MLflow, MinIO, PostgreSQL) twice: via Docker Compose and via Kubernetes (Minikube) on the same AWS EC2 instance, with NodePort services exposing each Kubernetes deployment.",
        "Built a KS-test based drift monitor comparing incoming request feature distributions against training data.",
      ],
    },
    results: [
      { label: "RMSE (LightGBM)", value: "336.33" },
      { label: "MAPE", value: "8.78%" },
      { label: "RMSE improvement vs ARIMA", value: "55%" },
      { label: "MLflow tracked runs", value: "21" },
    ],
    featured: false,
    order: 9,
  },
  {
    slug: "voice-driven-b2b-lead-gen-agent",
    title: "Voice-Driven B2B Lead Generation Agent",
    tagline: "A voice-first LiveKit agent that collects, confirms, and delivers B2B leads through natural conversation.",
    descriptions: {
      research:
        "An exploration of structured data extraction, normalizing industry and business names and capturing and confirming an email address, from free-form spoken input in a real-time voice pipeline, where the agent has to recover gracefully from partial or misheard transcripts before committing a lead to a webhook.",
      engineering:
        "A real-time voice agent built on LiveKit's agent SDK, using Google for speech-to-text and text-to-speech and a Tavus video avatar for the conversational interface. The agent walks a caller through a four-step flow, collecting target industries or business names, requesting an email address, reading it back for spoken confirmation, and forwarding the structured lead (industry, business, email, timestamp) to a webhook for downstream CRM processing, all within a single real-time voice session with noise cancellation.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "Voice AI", "LiveKit", "LLM Agents", "Speech-to-Text", "Text-to-Speech"],
    status: ["demo-video"],
    links: {
      github: "https://github.com/alyrraza/Voice-Driven-B2B-Lead-Generation-Agent",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/voice-driven-b2b-lead-gen-agent/thumbnail.png",
      caption: "Voice-Driven B2B Lead Generation Agent overview poster",
    },
    media: [
      { type: "video", src: "/videos/b2b-voice-agent-demo.mp4", caption: "End-to-end demo: voice conversation to webhook-delivered lead" },
    ],
    details: {
      research: [
        "Handled structured extraction (industry and business normalization, email capture and confirmation) from free-form spoken input, with the agent recovering from partial or misheard transcripts before committing a lead.",
      ],
      engineering: [
        "Built a real-time voice agent on LiveKit's agent SDK, wiring together Google speech-to-text and text-to-speech and a Tavus video avatar into a single conversational session.",
        "Implemented a four-step lead-capture flow: collect industry and business names, request an email address, read it back for spoken confirmation, then submit the structured lead to a webhook.",
        "Built an industry-extraction step to normalize free-form spoken business and industry mentions into clean structured fields before submission.",
        "Used aiohttp for asynchronous webhook delivery, disconnecting the session only after the lead payload (industry, business, email, timestamp) is confirmed sent.",
        "Added noise cancellation via LiveKit plugins to keep transcription reliable under real conversational audio conditions.",
      ],
    },
    results: [],
    featured: false,
    order: 10,
  },
  {
    slug: "voice-chat-assistant",
    title: "Voice Chat Assistant",
    tagline: "Speak into your mic, get a live transcript, an LLM reply, and a spoken response back, no local models or GPU required.",
    descriptions: {
      research:
        "An investigation into conversational-memory correctness in a stateless serverless LLM architecture, where the full per-request chat history has to be passed explicitly since there's no server-side session state to rely on, plus a migration case study in moving an LLM pipeline from local inference (Ollama) to hosted inference (Groq) to trade offline privacy for public deployability and speed.",
      engineering:
        "Voice Chat Assistant is a full-duplex voice conversation app, speech-to-text, LLM reply, text-to-speech, shipped as two frontends over related backend logic: a Streamlit app for local use (streaming mic audio over a websocket to Deepgram, Groq for chat completion with full conversational memory, Deepgram TTS for playback), and a React and Vite frontend deployed on Vercel that records audio in the browser and talks to a self-contained Python serverless function. It started as a Jupyter notebook wired to a local Ollama model, undeployable without a GPU; the rewrite replaced Ollama with Groq's hosted inference, added retry-with-backoff around every external API call, structured logging, a mocked pytest suite, and GitHub Actions CI. Getting the Vercel deployment right meant real production debugging: a Python file named index.py was silently shadowing the static site's own index.html, requiring an explicit builds/routes configuration once Vercel's zero-config detection proved unreliable for the hybrid static-plus-serverless shape.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "Voice AI", "LLM", "Real-time Systems", "Serverless", "Deepgram", "Groq"],
    status: ["live", "demo-video"],
    links: {
      github: "https://github.com/alyrraza/voice-chat-assistant",
      liveDemo: "https://voice-chat-assistant-gilt.vercel.app/",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/voice-chat-assistant/thumbnail.png",
      caption: "Voice Chat Assistant overview poster",
    },
    media: [
      { type: "video", src: "/videos/voice-chat-assistant-demo.mp4", caption: "Live demo: speak, transcribe, LLM reply, spoken response" },
    ],
    details: {
      research: [
        "Designed a stateless serverless architecture for the LLM backend, passing the full per-request conversation history explicitly since there's no server-side session state to rely on.",
        "Treated the Ollama-to-Groq migration as a deliberate trade-off, offline and private local inference for public deployability and speed, rather than assuming a hosted API is strictly better.",
      ],
      engineering: [
        "Built a full-duplex voice pipeline (Deepgram STT, Groq LLM with full conversational memory, Deepgram TTS) shipped as two frontends over related backend logic: a Streamlit local app and a React and Vite app deployed on Vercel.",
        "Migrated the LLM backend from a local Ollama model to Groq's hosted inference to remove the GPU dependency and make the app deployable to a public URL.",
        "Moved microphone capture from server-side (sounddevice, only works when server and laptop are the same machine) to the browser (MediaRecorder), the change required to make voice input work for a deployed, multi-user web app.",
        "Diagnosed a Vercel routing collision where a Python file named index.py silently shadowed the static frontend's own index.html, root-caused by reading Vercel's function and route inventory directly rather than trusting error messages.",
        "Landed on an explicit builds and routes configuration after zero-config auto-detection proved unreliable for the hybrid static-site-plus-serverless-function shape, and scoped the deployment's Root Directory correctly for the monorepo.",
        "Added retry-with-backoff around every external API call (STT, LLM, TTS), structured logging, and a pytest suite mocking all external calls, wired into GitHub Actions CI on every push.",
        "Removed a hardcoded, plaintext API key from the legacy prototype and replaced it with environment-variable-based secrets management ahead of making the repo public.",
      ],
    },
    results: [
      { label: "STT latency", value: "156ms" },
      { label: "LLM latency", value: "892ms" },
      { label: "TTS latency", value: "142ms" },
      { label: "Total round-trip", value: "1.19s" },
    ],
    featured: false,
    order: 11,
  },
  {
    slug: "copenhagen-cycling-ecosystem-analysis",
    title: "Copenhagen Cycling Ecosystem Analysis (Freelanced)",
    tagline: "Scraped and analyzed Copenhagen's bicycle retail ecosystem end to end, from Google Maps listings to underserved-market clustering.",
    descriptions: {
      research:
        "A market-gap analysis combining geospatial and statistical methods: population-per-shop ratios and K-Means clustering to identify underserved zip codes, Haversine-distance proximity mapping between same-category businesses, and linear regression to model bicycle usage and sales trends across income classes and time, all built on data scraped directly from Google Maps rather than a pre-packaged dataset.",
      engineering:
        "An end-to-end data analysis pipeline studying Copenhagen's bicycle retail and infrastructure ecosystem: Selenium scrapes 311 bicycle-related business listings (name, category, rating, address) from Google Maps, regex extracts Danish zip codes from addresses, and the data is merged with official population, income, transport, and bike-lane statistics across 17 zip codes. Interactive Folium maps (shop density heatmaps, category marker clusters, bike-lane coverage, Haversine-based same-category-neighbor proximity) surface the geospatial picture, K-Means clustering on population-per-shop ratio flags underserved zip codes as concrete market-expansion targets, and linear regression models usage and sales trends across income classes over multiple years. A small Dash app makes the shop dataset interactively explorable.",
    },
    lenses: ["engineering"],
    tags: ["Data Analyst", "Data Analysis", "Machine Learning", "Web Scraping", "Visualization"],
    status: ["screenshots"],
    links: {
      github: "https://github.com/alyrraza/Copenhagen-Cycling-Ecosystem-Analysis",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/copenhagen-cycling-ecosystem-analysis/thumbnail.png",
      caption: "Copenhagen Cycling Ecosystem Analysis overview poster",
    },
    media: [
      { type: "diagram", src: "/screenshots/copenhagen-cycling-ecosystem-analysis/overview.png", caption: "Combined statistical overview: trip patterns by income class, trip length, bike-lane density, thefts vs. sales trends, and bicycle-type popularity over time" },
      { type: "diagram", src: "/screenshots/copenhagen-cycling-ecosystem-analysis/underserved-zipcodes.png", caption: "Most underserved zip codes by population-per-shop ratio (zip 2000: about 5,091 people per shop)" },
      { type: "diagram", src: "/screenshots/copenhagen-cycling-ecosystem-analysis/shop-vs-population.png", caption: "Shop count vs. population by zip code: urban hubs dominate both, but retail presence doesn't map perfectly to population density" },
      { type: "diagram", src: "/screenshots/copenhagen-cycling-ecosystem-analysis/rating-distribution.png", caption: "Rating distribution by category: bicycle stores (164 listings, 4.30 avg) and repair shops (54 listings, 4.37 avg) are the most consistently well-rated" },
    ],
    details: {
      research: [
        "Combined population-per-shop ratio analysis with K-Means clustering to surface underserved markets rather than relying on raw shop counts alone.",
        "Used Haversine-distance proximity mapping to analyze same-category business clustering geographically.",
      ],
      engineering: [
        "Scraped 311 bicycle-related business listings (name, category, rating, address, About attributes) from Google Maps using Selenium.",
        "Extracted Danish zip codes from addresses via regex and merged the scraped data with official population, income, transport, and bike-lane statistics across 17 zip codes.",
        "Built interactive Folium maps: shop density heatmaps, category marker clusters, regional bike-lane coverage, and Haversine-distance same-category-neighbor proximity maps.",
        "Applied K-Means clustering on population-per-shop ratio to flag underserved zip codes (zip 2000: about 5,091 people per shop) as concrete market-expansion targets.",
        "Modeled bicycle usage and sales trends across income classes and time with linear regression on multi-year government transport survey data.",
        "Built a Dash app for interactively exploring the shop dataset.",
      ],
    },
    results: [
      { label: "Shops scraped", value: "311" },
      { label: "Zip codes analyzed", value: "17" },
      { label: "Most underserved zip", value: "~5,091 people/shop" },
      { label: "Top-rated category", value: "Repair shops (4.37 avg)" },
    ],
    featured: false,
    order: 12,
  },
  {
    slug: "job-ai-assistant",
    title: "Job AI Assistant",
    tagline: "Upload a CV and job description, get a match score and skill gaps, then take a real-time voice mock interview.",
    descriptions: {
      research:
        "An applied study in making multi-agent LLM pipelines self-correcting: every agent's output is schema-validated with Pydantic, and a failed validation triggers a self-critique step, the agent is shown its own invalid output and asked to fix it, before a bounded retry, rather than either accepting malformed output or failing the whole pipeline outright.",
      engineering:
        "A 3-agent pipeline orchestrated by a supervisor state machine: Agent 1 parses a CV and job description with Groq/Llama 3.1 and produces a validated match score, strengths, and gaps; Agent 2 generates behavioral, technical, and role-specific interview questions, calibrating difficulty from those gaps and retrieving similar past questions from a ChromaDB/LlamaIndex RAG store; Agent 3 conducts a real-time voice interview over LiveKit, transcribing answers with a local Whisper model, evaluating them with Groq, and speaking follow-ups and feedback back with Coqui TTS. Every agent inherits a shared self-healing loop, Pydantic-validated output, and on failure a self-critique-and-retry cycle (up to 3 attempts) before escalating. A FastAPI backend with WebSocket push updates drives a Next.js frontend through upload, live analysis, question review, and the voice interview itself, with MLflow tracking quality score, retry count, latency, and token usage per agent run.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "LLM Agents", "RAG", "Voice AI", "LangChain", "Next.js"],
    status: ["screenshots"],
    links: {
      github: "https://github.com/alyrraza/Job-ai-assistant",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/job-ai-assistant/thumbnail.png",
      caption: "Job AI Assistant (CV Interview Coach) overview poster",
    },
    media: [],
    details: {
      research: [
        "Made every agent's output schema-validated and self-correcting: a failed validation triggers a self-critique step, the agent sees its own invalid output and is asked to fix it, before a bounded retry.",
        "Used rule-based thresholds (gaps map to hard questions, score bands map to hire/consider/reject) instead of leaving those judgment calls to free-form LLM output, for more consistent grading across sessions.",
      ],
      engineering: [
        "Built a 3-agent pipeline (CV/JD analyzer, question generator, voice interviewer) behind a Supervisor MCP server that auto-advances agents through an explicit state machine.",
        "Gave every agent a shared self-healing loop: Pydantic v2 schema validation on every LLM output, with a self-critique-and-retry cycle (max 3 attempts) on failure before escalating.",
        "Built a RAG pipeline (LlamaIndex chunking, SentenceTransformer embeddings, ChromaDB cosine-similarity search) to retrieve similar past interview questions and inject them into the question-generation prompt.",
        "Built a real-time voice interview agent on LiveKit WebRTC, using a local Whisper model for speech-to-text and Coqui TTS for spoken feedback, with automatic follow-up questions when an answer scores 5 or below.",
        "Exposed the pipeline through a FastAPI backend with WebSocket push updates (state-change-only broadcasts, not polling) and a Next.js frontend that progressively reveals the match score, questions, and interview UI as each agent completes.",
        "Used Pydantic model_validator to auto-compute derived fields (average score, question counts, pass/fail) from LLM output rather than trusting the model to self-report them.",
        "Tracked quality score, retry count, latency, and token usage per agent run through MLflow.",
      ],
    },
    results: [],
    featured: false,
    order: 13,
  },
  {
    slug: "review-analysis-ai-agent",
    title: "Instagram Review Analysis using an AI Agent",
    tagline: "Fine-tuned Roman Urdu sentiment analysis on any public Instagram profile's comments, from username to insights dashboard.",
    descriptions: {
      research:
        "A model-adaptation exercise: taking a general Roman Urdu sentiment classifier (IndicBERT) fine-tuned on two datasets, then collapsing its original fine-grained sentiment scale down to three practical categories (positive, negative, neutral) via an SVM re-labeling step, rather than retraining from scratch for the simplified label space.",
      engineering:
        "Given only a public Instagram username, this agent scrapes the account's latest 30 posts and their comments (via Apify), classifies each comment's sentiment with a fine-tuned Roman Urdu BERT model (IndicBERT, re-labeled from a fine-grained scale to positive/negative/neutral via an SVM head), and surfaces the results, sentiment breakdown, trends, top keywords, through an interactive Gradio dashboard deployed on HuggingFace Spaces. Model weights are hosted in a private HuggingFace repo and pulled at runtime rather than committed to the codebase.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "NLP", "Sentiment Analysis", "BERT", "Gradio", "Web Scraping"],
    status: ["demo-video"],
    links: {
      github: "https://github.com/alyrraza/review-analysis-using-an-ai-agent",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/review-analysis-ai-agent/thumbnail.png",
      caption: "Instagram Sentiment Insights Dashboard overview poster",
    },
    media: [
      { type: "video", src: "/videos/review-analysis-demo.mp4", caption: "Demo: Instagram username to sentiment insights dashboard" },
    ],
    details: {
      research: [
        "Adapted a general Roman Urdu sentiment classifier to a simplified 3-class label space (positive, negative, neutral) via SVM re-labeling instead of retraining the base model from scratch.",
      ],
      engineering: [
        "Scraped the latest 30 posts and comments from any public Instagram profile using Apify's Instagram scraper, organized into a clean pandas pipeline.",
        "Fine-tuned IndicBERT (Roman Urdu) on two datasets, then re-labeled its output sentiment scale down to positive, negative, and neutral via an SVM classifier from scikit-learn.",
        "Built an interactive Gradio app, deployed as a HuggingFace Space, that takes just a username and returns a full sentiment breakdown, trend charts, and audience perception summary.",
        "Hosted fine-tuned model weights in a private HuggingFace model repo, pulled at runtime via an access token rather than committed to the repository.",
        "Built EDA visualizations (Matplotlib/Seaborn) surfacing sentiment trends, frequency distributions, and perception patterns per profile.",
      ],
    },
    results: [],
    featured: false,
    order: 14,
  },
  {
    slug: "allvoicelab-project",
    title: "Voice Cloned Audiobook Generator",
    tagline: "Upload a PDF, clone your voice from a short clip, and hear its answers read back in your own voice.",
    descriptions: {
      research:
        "An exploration of grounding LLM answers in retrieved document context (RAG over LangChain and FAISS) while routing the output through a separate, non-LLM voice-cloning pipeline (AllVoiceLab MCP), keeping the language model and the speech identity of the response as two independently swappable stages.",
      engineering:
        "A voice-cloned RAG chatbot: upload a PDF, and LangChain plus FAISS build a retrieval index over its text; ask a question and Gemini generates a grounded answer from the retrieved context; the response is then spoken back in a voice cloned from a 3 to 15 second audio sample via AllVoiceLab's MCP (Model Context Protocol) text-to-speech. The whole flow runs through a Streamlit interface, upload a PDF, record or upload a voice sample, ask a question, with voice cloning and speech synthesis running locally after initial setup.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "Voice AI", "RAG", "LangChain", "Text-to-Speech"],
    status: ["demo-video"],
    links: {
      github: "https://github.com/alyrraza/AllVoiceLab-MCP",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/allvoicelab-project/thumbnail.png",
      caption: "Voice-Cloned RAG overview poster",
    },
    media: [
      { type: "video", src: "/videos/allvoicelab-demo.mp4", caption: "Demo: PDF upload, voice cloning, and Q&A in your own voice" },
    ],
    details: {
      research: [
        "Treated the language model (Gemini, for grounded answer generation) and the voice-cloning stage (AllVoiceLab MCP) as independently swappable pipeline stages rather than a single coupled model.",
      ],
      engineering: [
        "Built a RAG pipeline over uploaded PDFs using LangChain and FAISS for vector storage and retrieval.",
        "Integrated AllVoiceLab's MCP (Model Context Protocol) to clone a user's voice from a 3 to 15 second audio sample and synthesize spoken responses in that cloned voice.",
        "Used the Gemini API to generate answers grounded in retrieved PDF context rather than the model's own unguided knowledge.",
        "Built a Streamlit interface covering the full flow: PDF upload, voice sample recording/upload, query input, and cloned-voice playback.",
        "Kept voice cloning and TTS running locally after initial setup, so spoken responses don't require a round trip to a cloud TTS API per query.",
      ],
    },
    results: [],
    featured: false,
    order: 15,
  },
  {
    slug: "costsegbnb",
    title: "CostSegBNB (Ongoing Freelance)",
    tagline: "A production SaaS platform that turns property photos into IRS-defensible tax depreciation reports, priced at $999 each.",
    descriptions: {
      research:
        "Diagnosed the true bottleneck in the original single-model detection pipeline (classification accuracy on visually similar fine-grained classes, not detection recall) and redesigned it into a 3-stage architecture: YOLOE-26 for object localization only, SAM2 for surface segmentation, and a Gemini vision-language model for fine-grained classification against the full 312-item taxonomy, with room-aware prompt hints. This replaces a traditional retraining pipeline with a prompt and taxonomy engineering problem, and early validation showed 5 of 6 exact classification matches with zero hallucinations on a benchmark image. Position-based IoU matching de-duplicates detections between the YOLOE and SAM2 passes, and pipeline changes are validated in an isolated model lab before being integrated into the shared production codebase.",
      engineering:
        "CostSegBNB is a production SaaS platform for real-estate cost segregation: property owners upload photos, and the system detects and classifies depreciable building components against a 312-item taxonomy, prices each item via live market search, classifies it into the correct IRS MACRS recovery period with legal citations, and generates an audit-ready PDF depreciation report, emailed automatically to the client. I own the technical direction end to end, backend architecture, the AI/ML detection pipeline, and the deployment/MLOps strategy, coordinating with a non-technical business stakeholder and a second engineer on the shared production codebase. The FastAPI backend (routers, services, integrations layers) handles Firebase auth with custom cookie-based sessions, Cloudinary media storage, a SerpAPI-backed live pricing engine with no hardcoded price tables, a full IRS Publication 946 MACRS depreciation engine, a fully programmatic ReportLab PDF generator (legal citations, visual evidence appendix, executive summary), and a human-in-the-loop admin correction workflow. The React and Vite frontend is deployed on Vercel.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "Computer Vision", "VLM", "FastAPI", "MLOps", "SaaS", "Firebase"],
    status: ["demo-video"],
    links: {},
    thumbnail: {
      type: "image",
      src: "/screenshots/costsegbnb/thumbnail.png",
      caption: "CostSegBNB overview poster",
    },
    media: [
      { type: "video", src: "/videos/costsegbnb-demo.mp4", caption: "Product demo: photo upload to IRS-ready depreciation report" },
    ],
    details: {
      research: [
        "Diagnosed that the original single-model YOLOE classifier's real weakness was fine-grained classification of visually similar classes, not detection localization, by separating concerns instead of patching one monolithic model.",
        "Redesigned the pipeline into 3 stages: YOLOE-26 for localization only, SAM2 for surface segmentation, and a Gemini VLM for fine-grained classification against a 312-item taxonomy with room-aware prompt hints.",
        "Chose VLM-based classification over traditional model retraining, betting that a well-prompted general vision-language model would generalize better to a 312-class fine-grained taxonomy than a fine-tuned closed-vocabulary detector, while eliminating the retraining and labeling burden entirely.",
        "Built position-based IoU matching to de-duplicate detections between the YOLOE and SAM2 passes so the same physical object isn't double-counted.",
        "Validated the redesign in an isolated model lab decoupled from production, reaching 5 of 6 exact classification matches with zero hallucinations on an early benchmark image before integrating any change into the shared codebase.",
        "Rejected two more complex alternatives, a visual-prompt reference-image bank and confidence-based detector routing, as over-engineered once evaluated against the simpler VLM-classification approach.",
      ],
      engineering: [
        "Designed and built the FastAPI backend service layer (auth, image ingestion, pricing, MACRS depreciation math, PDF generation, analytics, admin review) across a routers, services, and integrations architecture.",
        "Built a custom cookie-based session layer on top of Firebase Authentication, with automatic id/refresh token rotation and role-based access control (admin vs standard user).",
        "Built a measurement-aware pricing engine (SerpAPI Google Shopping/Search, per-sqft, per-linear-ft, and per-unit strategies, category-based fallback) with no hardcoded price tables, running all price lookups concurrently via asyncio.gather.",
        "Implemented the official IRS MACRS depreciation engine (Publication 946, Table A-1), computing a full year-by-year schedule and a structure-vs-land basis allocation per report.",
        "Built a fully programmatic ReportLab PDF generator producing an audit-ready report: cover page, executive summary, itemized asset table, legal citation support (IRC section 168, Rev. Proc. 87-56, case law), and a visual evidence appendix.",
        "Built a human-in-the-loop admin correction workflow (approve/reject on user-submitted detection corrections) as the foundation for future taxonomy and prompt refinement.",
        "Own the deployment and MLOps roadmap: moving inference off ad-hoc Vast.ai GPU rental onto a CPU-only production VPS, since the redesigned pipeline's classification step is a hosted Gemini API call rather than a self-hosted model.",
      ],
    },
    results: [
      { label: "Early pipeline validation", value: "5/6 matches, 0 hallucinations" },
      { label: "Detection taxonomy", value: "312 categories" },
      { label: "Report price point", value: "$999" },
      { label: "Traditional alternative cost", value: "$2,000-$5,000+" },
    ],
    featured: true,
    order: 0,
  },
  {
    slug: "srs-using-ai-agent",
    title: "SRS Generator (AI Agent)",
    tagline: "Turns a one-paragraph project description into a professional, UML-diagrammed SRS document in under 2 minutes.",
    descriptions: {
      research:
        "An applied study in decomposing a single large document-generation task into a sequential pipeline of narrow, single-responsibility LLM agents (one per SRS section) rather than one prompt generating the whole document, trading a single large generation for smaller, more controllable and retriable steps.",
      engineering:
        "An n8n-inspired, multi-agent pipeline that automates Software Requirements Specification writing: given a project name and a short description, a manager coordinates dedicated agents per section (Introduction, System Features, Overall Description, System Models) that call the Gemini API to generate content, assemble it into a formatted .docx via python-docx, and embed Use Case, Sequence, and Class diagrams generated through PlantUML, cutting a task that normally takes software teams 4 to 8 hours down to under 2 minutes.",
    },
    lenses: ["engineering"],
    tags: [SWE_TAG, "LLM Agents", "Automation", "Streamlit", "Document Generation"],
    status: ["demo-video"],
    links: {
      github: "https://github.com/alyrraza/SRS-using-AI-agent",
    },
    thumbnail: {
      type: "image",
      src: "/screenshots/srs-using-ai-agent/thumbnail.png",
      caption: "SRS Generator overview poster",
    },
    media: [
      { type: "video", src: "/videos/srs-demo.mp4", caption: "Demo: project description to downloadable SRS .docx with UML diagrams" },
    ],
    details: {
      research: [
        "Decomposed SRS generation into single-responsibility agents per document section rather than one large prompt, trading a single generation step for smaller, more controllable and retriable ones.",
      ],
      engineering: [
        "Built a modular, n8n-inspired multi-agent pipeline (a manager coordinating an IntroductionAgent, SystemFeaturesAgent, and others) where each agent owns one SRS section.",
        "Used the Gemini API to generate section content and python-docx to assemble it into a formatted, professional .docx document with headings and structured text.",
        "Auto-generated and embedded Use Case, Sequence, and Class UML diagrams via PlantUML based on the project description.",
        "Added retry logic (max 5 retries) and structured logging (loguru) around every agent call for resilience against LLM output failures.",
        "Built the interface in Streamlit: enter a name, project description, and file name, then download the generated .docx.",
      ],
    },
    results: [],
    featured: false,
    order: 16,
  },

  // Note: RadGuard, E2E-VarNet, ProgressGAN-CXR, InferBench appear in BOTH lenses.
  // CostSegBNB (order 0) is the flagship pitch project, no public repo yet (ongoing
  // freelance, private codebase).
];
