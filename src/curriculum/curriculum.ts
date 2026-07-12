/**
 * Atlas — Curriculum manifest.
 *
 * Single source of truth for tier → phase → topic hierarchy.
 * Drives sidebar navigation, dashboard progress, prev/next, static route
 * generation, and search index. Every future MDX file lives at
 *   content/tier-{tierId}/phase-{tierId}-{phaseIndex}/{topicSlug}.mdx
 * and is discovered from this manifest.
 */

export type Priority = "core" | "mandatory" | "optional";
export type WriteStatus = "written" | "outline";

export type Topic = {
  slug: string;                 // stable, kebab-case; used in URL and filename
  title: string;
  description: string;          // shows in sidebar tooltip + tier overview
  syllabusBullets: string[];    // the outline shown before "written" version exists
  priority: Priority;
  status: WriteStatus;
};

export type Phase = {
  id: string;                   // e.g. "0.1"
  slug: string;                 // e.g. "python-foundations"
  title: string;
  subtitle: string;
  topics: Topic[];
};

export type Tier = {
  id: number;                   // 0..6
  numeral: string;              // "0" / "I" / "II" ...
  slug: string;                 // "foundations", "mathematics", ...
  title: string;
  subtitle: string;
  duration: string;
  blurb: string;                // longer intro on tier page
  landing: string;              // one-line hook for dashboard card
  phases: Phase[];
};

// -----------------------------------------------------------------------------
// TIER 0 · Foundations — 2 phases · 16 topics
// -----------------------------------------------------------------------------
const tier0: Tier = {
  id: 0,
  numeral: "0",
  slug: "foundations",
  title: "Foundations",
  subtitle: "Programming & Tooling",
  duration: "3–4 weeks",
  landing:
    "Python by hand, then the scientific stack every notebook rests on.",
  blurb:
    "Before math, before models — the tools. Python from control flow to classes, then the four libraries every notebook opens with: NumPy, Pandas, Matplotlib, scikit-learn. By the end of this volume you'll load a real CSV, clean it, describe it, and print insights without asking a search engine what to do next.",
  phases: [
    {
      id: "0.1",
      slug: "python-craft",
      title: "Python, Deeply",
      subtitle: "The language, not the syntax reference",
      topics: [
        {
          slug: "environment-tooling",
          title: "Environment · uv, Ruff, and the modern Python setup",
          description:
            "A workstation that stays clean: uv for envs, Ruff for formatting, pytest for tests, git for history.",
          syllabusBullets: [
            "Python 3.12 install patterns; why version pinning matters",
            "uv: virtual envs, dependency resolution, lockfiles",
            "Ruff format + lint; project layout with src/ + pyproject",
            "pytest fundamentals and 'test as documentation'",
            "Jupyter vs .py: when to notebook, when not to",
          ],
          priority: "mandatory",
          status: "written",
        },
        {
          slug: "control-flow-data-model",
          title: "Control flow & the data model",
          description:
            "if/for/while — but really the underlying protocols: iterables, truthiness, equality.",
          syllabusBullets: [
            "for over iterables (not indices); enumerate/zip",
            "Truthiness rules & the tyranny of the empty container",
            "__eq__, __hash__ and why immutability matters",
            "Match statements as pattern-matching, not switch",
          ],
          priority: "core",
          status: "written",
        },
        {
          slug: "comprehensions-generators-decorators",
          title: "Comprehensions, generators & decorators",
          description:
            "The three moves that separate scripting from Pythonic code.",
          syllabusBullets: [
            "List/dict/set comprehensions — from loop to expression",
            "Generators and yield: memory-lazy pipelines",
            "Decorators as higher-order functions; @cache, @lru_cache",
            "Nuance: generator exhaustion, decorator argument passing",
          ],
          priority: "core",
          status: "written",
        },
        {
          slug: "functions-scope-closures",
          title: "Functions, scope, and closures",
          description:
            "The one thing that unlocks decorators, callbacks, and ML training loops.",
          syllabusBullets: [
            "Positional/keyword/*args/**kwargs — when each is right",
            "LEGB scope; closures & captured variables",
            "Type hints (PEP 484 → 695) as executable documentation",
            "Function objects and higher-order patterns",
          ],
          priority: "core",
          status: "written",
        },
        {
          slug: "classes-protocols-dataclasses",
          title: "Classes, protocols & dataclasses",
          description:
            "Modern Python OOP — dataclasses, protocols, and 'composition over inheritance'.",
          syllabusBullets: [
            "@dataclass basics; frozen, slots, __post_init__",
            "Protocol vs ABC — structural vs nominal typing",
            "Composition patterns; when inheritance actually helps",
            "Dunder methods: __repr__, __iter__, __len__, __add__",
          ],
          priority: "mandatory",
          status: "written",
        },
        {
          slug: "errors-testing-logging",
          title: "Errors, testing & logging",
          description:
            "Exceptions as design; pytest fixtures; structured logging.",
          syllabusBullets: [
            "Custom exception hierarchies; EAFP vs LBYL",
            "pytest fixtures, parametrize, monkeypatch",
            "Logging vs print; structured logs; log levels in ML pipelines",
            "Assertions as invariants (not tests)",
          ],
          priority: "mandatory",
          status: "written",
        },
        {
          slug: "concurrency-async",
          title: "Concurrency: threads, processes, asyncio",
          description:
            "GIL truths and lies; when to reach for each concurrency tool.",
          syllabusBullets: [
            "The GIL, honestly explained",
            "threading vs multiprocessing vs asyncio — decision tree",
            "async/await patterns; anyio & structured concurrency",
            "concurrent.futures for embarrassingly parallel jobs",
          ],
          priority: "optional",
          status: "written",
        },
        {
          slug: "cli-io-serialization",
          title: "CLI, I/O & serialization",
          description:
            "argparse/Click, pathlib, JSON/YAML/Parquet — the boundaries of your program.",
          syllabusBullets: [
            "argparse / Click / Typer — which and when",
            "pathlib for filesystem work (never os.path again)",
            "JSON, YAML, TOML, Parquet — trade-offs",
            "Streaming large files; context managers",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "0.2",
      slug: "scientific-stack",
      title: "The Scientific Stack",
      subtitle: "NumPy · Pandas · Matplotlib · scikit-learn",
      topics: [
        {
          slug: "numpy-arrays-vectorization",
          title: "NumPy: arrays & vectorization",
          description:
            "The ndarray, dtypes, and why for-loops die in scientific code.",
          syllabusBullets: [
            "ndarray anatomy: shape, dtype, stride, contiguous memory",
            "Vectorization vs Python loops — 100× intuition",
            "Universal functions (ufuncs) and reductions",
            "Random state & seeding for reproducibility",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "numpy-broadcasting-slicing",
          title: "Broadcasting, slicing & fancy indexing",
          description:
            "The mental model that turns matrix code into one-liners.",
          syllabusBullets: [
            "Broadcasting rules — right-align dimensions",
            "Basic slices vs fancy (integer/boolean) indexing",
            "View vs copy — the source of half your bugs",
            "einsum for the ambitious",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "pandas-dataframe-fundamentals",
          title: "Pandas: DataFrames & Series",
          description:
            "Index-aware tables; loc vs iloc; the split-apply-combine mindset.",
          syllabusBullets: [
            "Series/DataFrame anatomy; index as first-class citizen",
            "loc vs iloc; boolean masks; SettingWithCopyWarning",
            "dtypes: category, datetime, nullable ints",
            "Reading messy CSVs without crying",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "pandas-groupby-merges",
          title: "GroupBy, merges & pivots",
          description:
            "Split-apply-combine; joins that don't silently drop rows.",
          syllabusBullets: [
            "GroupBy: aggregate, transform, filter, apply",
            "merge vs join vs concat; validating join cardinality",
            "pivot_table & melt (wide ↔ long)",
            "rolling windows and time-based aggregation",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "matplotlib-figures",
          title: "Matplotlib: figures that communicate",
          description:
            "The Figure/Axes model; how to make a chart that survives a code review.",
          syllabusBullets: [
            "Figure/Axes API (avoid pyplot state)",
            "Chart selection: distribution, comparison, relationship",
            "Small multiples & annotations",
            "Style, color, and honest scales",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "eda-cleaning",
          title: "EDA & data cleaning workflows",
          description:
            "Dtypes, missingness, outliers, encoding — the unglamorous 60% of the job.",
          syllabusBullets: [
            "First-look checklist: shape, dtypes, missing, duplicates",
            "Missingness patterns (MCAR/MAR/MNAR) and safe imputation",
            "Outlier detection: IQR, z-score, domain rules",
            "Categorical encoding trade-offs (before sklearn)",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "sklearn-shape-of-ml",
          title: "scikit-learn: the shape of ML code",
          description:
            "Estimators, transformers, pipelines — the abstraction that made a decade of ML sane.",
          syllabusBullets: [
            "fit/predict/transform contract",
            "Pipeline + ColumnTransformer as declarative preprocessing",
            "Cross-validation objects; scoring vs score",
            "Persistence (joblib) and pipeline serialization",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "project-csv-cli",
          title: "Project · CSV → insights CLI",
          description:
            "The Volume-0 artifact: a real command-line tool that ingests, cleans, and reports.",
          syllabusBullets: [
            "argparse or Typer entrypoint",
            "Pandas + Matplotlib for cleaning + charts",
            "Structured logging + tests",
            "Package as pip-installable CLI",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// TIER 1 · Mathematics — 6 phases · 48 topics
// -----------------------------------------------------------------------------
const tier1: Tier = {
  id: 1,
  numeral: "I",
  slug: "mathematics",
  title: "The Mathematics",
  subtitle: "of Learning Machines",
  duration: "10–12 weeks",
  landing:
    "Linear algebra as geometry, calculus as motion, probability as belief.",
  blurb:
    "The heart of the atlas. Every idea approached from four sides — geometric, algebraic, computational, probabilistic — until they collapse onto one truth. Six phases: vectors → matrices → calculus → probability → statistics → optimization. Every result derived; every symbol defined; every intuition earned.",
  phases: [
    {
      id: "1.1",
      slug: "vectors-space",
      title: "Vectors & Vector Spaces",
      subtitle: "Space, direction, magnitude",
      topics: [
        {
          slug: "scalars-vectors-notation",
          title: "Scalars, vectors, and notation",
          description:
            "The convention wars: column vs row, subscripts vs indexing, textbook vs code.",
          syllabusBullets: [
            "Scalars, tuples, vectors — the different words for one idea",
            "Column vectors as the default in ML",
            "Subscript conventions; bold vs italic",
            "Vectors as arrows vs vectors as data points",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "vector-addition-scaling",
          title: "Vector addition & scaling",
          description:
            "Tip-to-tail geometry, component arithmetic, and the birth of linearity.",
          syllabusBullets: [
            "Addition: geometric parallelogram + algebraic component-wise",
            "Scalar multiplication and reversal",
            "Linear combinations as recipes",
            "Zero vector, additive inverse",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "dot-product-cosine-similarity",
          title: "Dot product & cosine similarity",
          description:
            "The one operation that powers half of modern ML — three angles that meet.",
          syllabusBullets: [
            "Geometric definition: projection × length",
            "Algebraic definition: sum of products",
            "cos θ = a·b / (‖a‖‖b‖) — full derivation",
            "Angle sensitivity vs magnitude sensitivity",
            "Cosine similarity as the workhorse of retrieval & recommenders",
          ],
          priority: "core",
          status: "written",
        },
        {
          slug: "norms-distances",
          title: "Norms & distances",
          description:
            "L1 vs L2 vs L∞ — every optimizer & regularizer picks one.",
          syllabusBullets: [
            "L1, L2, L∞ definitions and shapes",
            "Manhattan, Euclidean, Chebyshev",
            "Cosine distance — why it is not a metric",
            "Norm balls and geometric intuition",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "linear-independence-basis",
          title: "Linear independence, span & basis",
          description:
            "The frame you build the world on — a basis is a coordinate system.",
          syllabusBullets: [
            "Span: what a set of vectors can reach",
            "Linear independence and redundancy",
            "Basis and dimension of a subspace",
            "Change of basis as a lens swap",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "projections-orthogonality",
          title: "Projections & orthogonality",
          description:
            "How to drop a perpendicular; the geometric heart of least squares.",
          syllabusBullets: [
            "Orthogonality and the Pythagorean identity",
            "Scalar & vector projections",
            "Gram–Schmidt process (intuition first, algebra second)",
            "Orthonormal bases — coordinates the easy way",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "1.2",
      slug: "matrices-transformations",
      title: "Matrices & Transformations",
      subtitle: "Grids of numbers, gestures of space",
      topics: [
        {
          slug: "matrix-as-transformation",
          title: "Matrix as linear transformation",
          description:
            "Every matrix is a verb — it takes vectors somewhere.",
          syllabusBullets: [
            "Where the standard basis lands = columns of the matrix",
            "Composition = multiplication",
            "Rotation, scale, shear, reflection catalog",
            "Non-square matrices as dimension changers",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "matrix-multiplication",
          title: "Matrix multiplication — three views",
          description:
            "Row × column, columns × columns, and 'composition of functions'.",
          syllabusBullets: [
            "Row-dot-column view",
            "Linear combination of columns view",
            "Function composition view",
            "Associativity, non-commutativity, distributivity",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "determinant-inverse",
          title: "Determinant & inverse",
          description:
            "Signed volume; when a transformation can be undone.",
          syllabusBullets: [
            "Determinant as scaling factor of area/volume",
            "Sign flip = orientation reversal",
            "Inverse: existence & computation",
            "Numerical instability of the inverse in practice",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "rank-nullspace",
          title: "Rank, column space & nullspace",
          description:
            "The 'four fundamental subspaces' picture — which vectors survive, which get crushed.",
          syllabusBullets: [
            "Column space & row space",
            "Nullspace as 'inputs that disappear'",
            "Rank-nullity theorem",
            "Rank as the effective dimension of a dataset",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "eigenvectors-eigenvalues",
          title: "Eigenvectors & eigenvalues",
          description:
            "The special directions a transformation only stretches — the DNA of a matrix.",
          syllabusBullets: [
            "Definition: Av = λv, geometry first",
            "Characteristic polynomial (last, not first)",
            "Diagonalizability and defective matrices",
            "Where eigen-analysis shows up: PCA, PageRank, dynamics",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "svd-decomposition",
          title: "Singular Value Decomposition (SVD)",
          description:
            "'Rotate, stretch along axes, rotate' — the most useful factorization in ML.",
          syllabusBullets: [
            "Geometric picture: 3-step decomposition",
            "Full vs thin/truncated SVD",
            "Relation to eigendecomposition",
            "Compression: rank-k approximation & Eckart–Young",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "matrix-factorization-menagerie",
          title: "LU, QR & Cholesky — decomposition menagerie",
          description:
            "The other factorizations; when each solves your linear system fastest.",
          syllabusBullets: [
            "LU: Gaussian elimination as factorization",
            "QR: orthogonal + upper-triangular (least squares)",
            "Cholesky: symmetric positive definite fast-path",
            "When to reach for which",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "positive-definite",
          title: "Symmetric & positive-definite matrices",
          description:
            "The 'nice' matrices — real eigenvalues, orthogonal eigenvectors, convex quadratics.",
          syllabusBullets: [
            "Symmetric matrix properties",
            "Positive-definite: definitions and tests",
            "Quadratic forms and their level sets",
            "Where PSD lurks: covariance, kernels, Hessians",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "pca-from-linear-algebra",
          title: "PCA — from linear algebra alone",
          description:
            "Bring vectors, matrices, eigen-decomposition together to compress data.",
          syllabusBullets: [
            "Covariance matrix as inner product of features",
            "Principal components = top eigenvectors",
            "SVD view: PCA without covariance matrix",
            "Explained variance & scree plots",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
    {
      id: "1.3",
      slug: "calculus",
      title: "Calculus for ML",
      subtitle: "Rates, gradients, gradients of gradients",
      topics: [
        {
          slug: "limits-continuity",
          title: "Limits & continuity",
          description:
            "The first idea calculus asks you to trust — approaching without reaching.",
          syllabusBullets: [
            "Intuitive & ε–δ definitions side by side",
            "One-sided limits, infinity",
            "Continuity: three-part definition",
            "Why numerical discontinuity matters in loss landscapes",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "derivatives-single-var",
          title: "Derivatives, single variable",
          description:
            "Instantaneous rate as a limit; slope as the linear approximation.",
          syllabusBullets: [
            "Definition as a limit; secant → tangent",
            "Rules: sum, product, quotient, chain",
            "Common derivatives (memorized table)",
            "Higher-order derivatives; concavity",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "chain-rule",
          title: "The chain rule",
          description:
            "The one rule that makes backprop possible — every layer is a link.",
          syllabusBullets: [
            "Univariate chain rule with story intuition",
            "Composition of two, three, many functions",
            "Chain rule as a graph traversal",
            "Preview: how backprop uses it",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "gradient-descent-intuition",
          title: "Gradient descent — the intuition",
          description:
            "Walking downhill on a landscape of loss — with a real Pyodide demo fitting a line.",
          syllabusBullets: [
            "Gradient as steepest-ascent vector",
            "Update rule x ← x - η∇f(x)",
            "Learning rate, divergence, oscillation",
            "Fit a line by hand, then in numpy",
          ],
          priority: "core",
          status: "written",
        },
        {
          slug: "multivariable-partials",
          title: "Partial derivatives & the gradient",
          description:
            "One derivative per input direction; the gradient as their bundle.",
          syllabusBullets: [
            "∂f/∂xᵢ intuition and notation",
            "Total derivative vs partial derivative",
            "Gradient vector and its geometric meaning",
            "Directional derivatives",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "jacobian-hessian",
          title: "Jacobian & Hessian",
          description:
            "Higher-order structures: how a vector-valued map bends and curves.",
          syllabusBullets: [
            "Jacobian: derivative of vector field",
            "Hessian: second derivatives, curvature",
            "Positive-definite Hessian ⇒ local minimum",
            "Uses in second-order optimization",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "backprop-as-chain-rule",
          title: "Backpropagation as calculus, not magic",
          description:
            "Backprop = chain rule + a computation graph; nothing mysterious.",
          syllabusBullets: [
            "Forward pass = evaluation graph",
            "Backward pass = local gradients × upstream signal",
            "Autograd conceptually",
            "Vanishing/exploding gradient preview",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "integration-basics",
          title: "Integration — enough for probability",
          description:
            "Areas, expectations, and the tools you'll actually use.",
          syllabusBullets: [
            "Antiderivatives and the fundamental theorem",
            "Substitution & integration by parts",
            "Numerical integration (trapezoid, Simpson)",
            "Preview: PDFs integrate to one",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "1.4",
      slug: "probability",
      title: "Probability — Belief in Numbers",
      subtitle: "Randomness, conditioning, expectation",
      topics: [
        {
          slug: "sample-spaces-events",
          title: "Sample spaces, events & axioms",
          description:
            "What probability is about before we compute a single number.",
          syllabusBullets: [
            "Outcomes, events, sample space",
            "Kolmogorov axioms",
            "Set operations on events",
            "Frequentist vs Bayesian readings",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "conditional-independence",
          title: "Conditional probability & independence",
          description:
            "How new information reshapes belief — Bayes preview.",
          syllabusBullets: [
            "Conditional probability definition",
            "Independence (and its many failures)",
            "Chain rule for probability",
            "Common paradoxes (Monty Hall, base rate)",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "bayes-theorem",
          title: "Bayes' theorem — belief updating",
          description:
            "Prior × likelihood ÷ evidence — the entire idea, derived and then intuited.",
          syllabusBullets: [
            "Derivation from conditional probability",
            "Prior, likelihood, posterior — vocabulary that sticks",
            "Bayesian classifier preview",
            "Common medical-test example (base-rate fallacy)",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "random-variables",
          title: "Random variables & distributions",
          description:
            "Numbers you can't predict but can describe.",
          syllabusBullets: [
            "Discrete vs continuous random variables",
            "PMF, PDF, CDF",
            "Support and normalization",
            "Change of variables",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "expectation-variance",
          title: "Expectation, variance & moments",
          description:
            "Central location, spread, and higher shape.",
          syllabusBullets: [
            "Expectation as a weighted average",
            "Variance & standard deviation",
            "Linearity of expectation",
            "Covariance and correlation",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "distributions-catalog",
          title: "A catalog of distributions",
          description:
            "Bernoulli, binomial, Poisson, Gaussian, exponential — when to reach for each.",
          syllabusBullets: [
            "Discrete: Bernoulli, Binomial, Categorical, Poisson",
            "Continuous: Uniform, Gaussian, Exponential, Beta, Gamma",
            "Multivariate Gaussian anatomy",
            "Distribution family cheat-sheet",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "clt-lln",
          title: "Law of large numbers & CLT",
          description:
            "Why averaging works, and why almost everything ends up Gaussian.",
          syllabusBullets: [
            "LLN — sample means converge",
            "CLT — the sum of iid rvs tends to normal",
            "Simulation demo of both",
            "Consequences for ML sampling",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "information-entropy",
          title: "Information, entropy & KL divergence",
          description:
            "Bits of surprise; how far one distribution is from another.",
          syllabusBullets: [
            "Shannon information & entropy",
            "Cross-entropy — the classification loss",
            "KL divergence: definition, properties, non-symmetry",
            "Mutual information",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
    {
      id: "1.5",
      slug: "statistics",
      title: "Statistics — Learning From Samples",
      subtitle: "Estimation, testing, honest uncertainty",
      topics: [
        {
          slug: "estimation-mle",
          title: "Estimation & maximum likelihood",
          description:
            "Turn a distribution family into parameters that fit your data.",
          syllabusBullets: [
            "Estimators; bias & variance",
            "Likelihood function; log-likelihood",
            "MLE derivations (Bernoulli, Gaussian)",
            "MLE as an ML objective",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "map-and-priors",
          title: "MAP estimation & regularization",
          description:
            "Where Bayesian priors meet ML regularization — L2 = Gaussian prior.",
          syllabusBullets: [
            "MAP as MLE plus a prior term",
            "L2 regularization ↔ Gaussian prior",
            "L1 regularization ↔ Laplace prior",
            "Conjugate priors sneak peek",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "hypothesis-testing",
          title: "Hypothesis testing done honestly",
          description:
            "p-values, effect sizes, and the traps every practitioner has stepped in.",
          syllabusBullets: [
            "Null / alternative; type I / type II errors",
            "p-value: what it is (and isn't)",
            "t-test, χ² test, permutation tests",
            "Multiple-comparison corrections",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "confidence-bootstrap",
          title: "Confidence intervals & the bootstrap",
          description:
            "Uncertainty you can defend; resampling as your best friend.",
          syllabusBullets: [
            "Frequentist confidence intervals",
            "Bayesian credible intervals — the difference matters",
            "Bootstrap: percentile & pivot methods",
            "When bootstrap breaks down",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "ab-testing-power",
          title: "A/B testing & statistical power",
          description:
            "The applied statistician's daily bread; how to size an experiment.",
          syllabusBullets: [
            "Design of experiments",
            "Power, effect size, sample size trade-offs",
            "Sequential testing (peeking traps)",
            "Bayesian A/B alternatives",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "regression-diagnostics",
          title: "Regression diagnostics",
          description:
            "Residuals, leverage, collinearity — the health check on a linear model.",
          syllabusBullets: [
            "Residual plots and homoscedasticity",
            "Leverage & influence (Cook's D)",
            "Multicollinearity & VIF",
            "Q–Q plots and normality checks",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "bayesian-inference",
          title: "Bayesian inference in practice",
          description:
            "Priors, posteriors, and MCMC — with a real toy example.",
          syllabusBullets: [
            "Bayesian workflow",
            "MCMC intuition (Metropolis–Hastings)",
            "Posterior predictive checks",
            "When Bayesian beats frequentist",
          ],
          priority: "optional",
          status: "outline",
        },
      ],
    },
    {
      id: "1.6",
      slug: "optimization",
      title: "Optimization — The Engine",
      subtitle: "The recipe every learner runs at heart",
      topics: [
        {
          slug: "convex-vs-nonconvex",
          title: "Convex vs non-convex objectives",
          description:
            "Why convex problems are the sweet spot — and why deep learning isn't.",
          syllabusBullets: [
            "Convex sets & convex functions",
            "Local vs global minima",
            "Convex optimization is 'solved' — mostly",
            "Non-convex realities of neural networks",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "sgd-and-friends",
          title: "SGD, momentum, and mini-batches",
          description:
            "Stochastic gradients: noise as a feature, not a bug.",
          syllabusBullets: [
            "Batch vs mini-batch vs stochastic",
            "Momentum & Nesterov",
            "Choosing batch size",
            "The generalization value of noise",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "adaptive-optimizers",
          title: "Adam, AdamW & the adaptive family",
          description:
            "Per-parameter learning rates that made large models trainable.",
          syllabusBullets: [
            "RMSProp / Adagrad — the ancestors",
            "Adam full recipe",
            "AdamW — weight decay done right",
            "When plain SGD still wins",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "learning-rate-schedules",
          title: "Learning rate schedules & warmup",
          description:
            "Cosine, one-cycle, linear warmup — the choreography of a modern training run.",
          syllabusBullets: [
            "Step, exponential, cosine schedules",
            "Linear warmup (why transformers need it)",
            "One-cycle policy",
            "How to sanity-check your schedule",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "constrained-optimization",
          title: "Constrained optimization & Lagrangians",
          description:
            "Optimization with rules — hard constraints, soft penalties.",
          syllabusBullets: [
            "Equality-constrained problems",
            "Lagrange multipliers intuition",
            "KKT conditions",
            "Where this shows up (SVM, RLHF)",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "second-order-methods",
          title: "Newton, quasi-Newton & natural gradients",
          description:
            "Curvature-aware optimization — why we rarely use it, and when we do.",
          syllabusBullets: [
            "Newton's method",
            "BFGS / L-BFGS",
            "Natural gradient descent",
            "Cost vs benefit at LLM scale",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "project-numpy-optimization",
          title: "Project · Gradient descent + PCA from scratch",
          description:
            "The Volume-I artifact: NumPy-only implementations tested on real data.",
          syllabusBullets: [
            "GD/SGD implementations from first principles",
            "Line-fitting demo with animated updates",
            "PCA from scratch (covariance & SVD paths)",
            "Package as an installable repo",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// TIER 2 · Core ML — 3 phases · 20 topics
// -----------------------------------------------------------------------------
const tier2: Tier = {
  id: 2,
  numeral: "II",
  slug: "core-ml",
  title: "Core Machine Learning",
  subtitle: "Classical Foundations",
  duration: "4–5 weeks",
  landing:
    "From linear regression to gradient-boosted trees. Feature engineering, evaluation, and the bias–variance dance.",
  blurb:
    "The models that ran the industry for two decades — and still do the majority of production work. Linear + tree + kernel families; feature engineering; evaluation without lying to yourself; the bias–variance trade-off in its clearest form.",
  phases: [
    {
      id: "2.1",
      slug: "supervised-basics",
      title: "Supervised Learning Foundations",
      subtitle: "Regression, classification, evaluation",
      topics: [
        {
          slug: "linear-regression",
          title: "Linear regression — closed form and gradient",
          description:
            "The ML model to derive fully — you only get to derive once.",
          syllabusBullets: [
            "Model, loss, normal equations",
            "Gradient descent path",
            "Assumptions & when they matter",
            "Interpretability of coefficients",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "logistic-regression",
          title: "Logistic regression",
          description:
            "The bridge from regression to classification, and to modern neural nets.",
          syllabusBullets: [
            "Sigmoid + log-loss motivation",
            "MLE derivation from Bernoulli",
            "Decision boundary geometry",
            "Multiclass extension (softmax)",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "regularization",
          title: "Regularization (L1, L2, elastic net)",
          description:
            "Constraining freedom to gain generalization.",
          syllabusBullets: [
            "L2 (ridge) and Bayesian interpretation",
            "L1 (lasso) and sparsity",
            "Elastic net",
            "Hyperparameter selection",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "bias-variance-tradeoff",
          title: "Bias–variance trade-off",
          description:
            "The single most important trade-off in ML — and why it never fully goes away.",
          syllabusBullets: [
            "Expected error decomposition",
            "Bias vs variance visualized",
            "Learning curves and diagnosis",
            "Modern deep-learning wrinkle (double descent)",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "cross-validation",
          title: "Cross-validation & data splitting",
          description:
            "Honest evaluation; the pitfalls that make private-leaderboard scores drop.",
          syllabusBullets: [
            "Train/val/test hygiene",
            "k-fold, stratified, group k-fold",
            "Time-series splits",
            "Nested CV for hyperparameter search",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "metrics-classification",
          title: "Classification metrics deep-dive",
          description:
            "Accuracy is almost never enough — pick the right lens.",
          syllabusBullets: [
            "Confusion matrix; precision, recall, F1",
            "ROC vs PR curves",
            "Calibration (reliability diagrams)",
            "Cost-sensitive thresholding",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "metrics-regression",
          title: "Regression metrics & residuals",
          description:
            "MSE vs MAE vs MAPE — and when the wrong metric hides the wrong model.",
          syllabusBullets: [
            "MSE, RMSE, MAE, MAPE, R², adjusted R²",
            "Huber loss & robust regression",
            "Quantile regression",
            "Residual analysis",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "2.2",
      slug: "tree-and-kernel-methods",
      title: "Trees, Kernels & Ensembles",
      subtitle: "The non-linear classics",
      topics: [
        {
          slug: "decision-trees",
          title: "Decision trees",
          description:
            "The interpretable non-linear baseline — greedy splits on impurity.",
          syllabusBullets: [
            "Gini / entropy / MSE splits",
            "Recursive partitioning",
            "Overfitting & pruning",
            "Interpretability trade-offs",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "random-forests",
          title: "Random forests & bagging",
          description:
            "Ensemble by variance reduction — the easy win.",
          syllabusBullets: [
            "Bagging intuition",
            "Feature subsampling",
            "Out-of-bag estimation",
            "Feature importance (permutation vs impurity)",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "gradient-boosting",
          title: "Gradient-boosted trees (XGBoost/LightGBM/CatBoost)",
          description:
            "The undefeated winner of most tabular Kaggle competitions — for a reason.",
          syllabusBullets: [
            "Boosting principle",
            "Gradient boosting derivation",
            "XGBoost, LightGBM, CatBoost differences",
            "Practical tuning cookbook",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "svm-kernels",
          title: "SVMs & the kernel trick",
          description:
            "Max-margin classifiers; the geometry, then the trick.",
          syllabusBullets: [
            "Max-margin intuition",
            "Soft-margin SVM & the C hyperparameter",
            "Kernel trick as inner-product substitution",
            "RBF, polynomial kernels",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "knn-and-lazy",
          title: "k-Nearest Neighbors & lazy learners",
          description:
            "The 'no model' model; strong baseline, weak scaler.",
          syllabusBullets: [
            "Distance choice sensitivity",
            "Curse of dimensionality — first encounter",
            "Weighted kNN & ball trees",
            "When kNN is the right answer",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "naive-bayes",
          title: "Naive Bayes classifiers",
          description:
            "A surprisingly strong baseline; when the naive assumption is fine.",
          syllabusBullets: [
            "Bayes rule refresher",
            "Independence assumption",
            "Gaussian, Bernoulli, Multinomial variants",
            "Text-classification worked example",
          ],
          priority: "optional",
          status: "outline",
        },
      ],
    },
    {
      id: "2.3",
      slug: "unsupervised-and-features",
      title: "Unsupervised & Feature Engineering",
      subtitle: "Structure without labels",
      topics: [
        {
          slug: "kmeans-clustering",
          title: "k-means & clustering",
          description:
            "The clustering algorithm you'll fight most — how it thinks, how it fails.",
          syllabusBullets: [
            "Lloyd's algorithm derivation",
            "Choosing k (elbow, silhouette, gap)",
            "Failure modes (anisotropic clusters)",
            "k-means++ initialization",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "hierarchical-density-clustering",
          title: "Hierarchical & density-based clustering",
          description:
            "When k-means shape assumptions fail — DBSCAN, HDBSCAN, agglomerative.",
          syllabusBullets: [
            "Agglomerative clustering linkages",
            "DBSCAN and HDBSCAN",
            "Silhouette vs Davies–Bouldin",
            "Choosing the right family",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "dimensionality-reduction",
          title: "Dimensionality reduction (PCA, t-SNE, UMAP)",
          description:
            "See a thousand dimensions in two — and know what the projection lies about.",
          syllabusBullets: [
            "PCA recap (linear projection)",
            "t-SNE — probability preservation",
            "UMAP — topology preservation",
            "Interpreting embeddings honestly",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "feature-engineering",
          title: "Feature engineering — the craft",
          description:
            "Where the model wins or loses; encoding, scaling, interaction terms.",
          syllabusBullets: [
            "Numerical: scaling, binning, transforms",
            "Categorical: one-hot, target, embeddings",
            "Interaction & polynomial features",
            "Date/time and text features",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "imbalance-strategies",
          title: "Handling class imbalance",
          description:
            "Techniques from resampling to focal loss — and when to skip them.",
          syllabusBullets: [
            "Resampling (SMOTE, undersampling)",
            "Class weights",
            "Threshold moving",
            "Metric selection under imbalance",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "hyperparameter-search",
          title: "Hyperparameter search",
          description:
            "Grid, random, Bayesian, and when to stop.",
          syllabusBullets: [
            "Grid vs random vs Bayesian search",
            "Optuna basics",
            "Successive halving & Hyperband",
            "How much to spend on search",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "project-end-to-end-classifier",
          title: "Project · End-to-end tabular classifier",
          description:
            "Volume-II artifact: EDA → features → three models → evaluation & write-up.",
          syllabusBullets: [
            "Data ingestion & EDA",
            "Feature engineering pipeline",
            "Three model families compared",
            "Evaluation, interpretation, deployment prep",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// TIER 3 · Deep Learning — 2 phases · 14 topics
// -----------------------------------------------------------------------------
const tier3: Tier = {
  id: 3,
  numeral: "III",
  slug: "deep-learning",
  title: "Deep Learning",
  subtitle: "Neural Architectures",
  duration: "4–5 weeks",
  landing:
    "Backprop from first principles; CNNs for vision; RNNs for sequences — and the limits that demand transformers.",
  blurb:
    "The bridge tier. Feedforward networks derived from scratch, backprop as calculus, PyTorch fundamentals, then convolutional and recurrent architectures. This tier's job: understand *why* transformers had to be invented before we build them.",
  phases: [
    {
      id: "3.1",
      slug: "neural-nets-basics",
      title: "Neural Networks From Scratch",
      subtitle: "Forward, backward, and everything in-between",
      topics: [
        {
          slug: "perceptron-to-mlp",
          title: "From perceptron to multi-layer network",
          description:
            "Trace the arc from a single neuron to the universal approximator.",
          syllabusBullets: [
            "Perceptron model & training rule",
            "Why one layer isn't enough (XOR)",
            "MLP architecture",
            "Universal approximation, intuitively",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "activation-functions",
          title: "Activation functions",
          description:
            "ReLU, GELU, sigmoid, tanh — why each was invented, why we usually pick ReLU.",
          syllabusBullets: [
            "Sigmoid & tanh (and their problems)",
            "ReLU family: ReLU, LeakyReLU, PReLU",
            "GELU, Swish, and modern picks",
            "Softmax as the classification cap",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "loss-functions",
          title: "Loss functions in depth",
          description:
            "MSE, cross-entropy, focal, contrastive — matching the loss to the task.",
          syllabusBullets: [
            "Regression losses recap",
            "Cross-entropy — full derivation",
            "Focal loss for imbalance",
            "Contrastive losses preview",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "backprop-from-scratch",
          title: "Backprop implemented from scratch",
          description:
            "Write autograd in ~200 lines of NumPy; understand every gradient.",
          syllabusBullets: [
            "Computation graph as a data structure",
            "Forward & backward pass code",
            "Testing gradients numerically",
            "Why PyTorch does this efficiently",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "regularization-normalization",
          title: "Regularization & normalization",
          description:
            "Dropout, BatchNorm, LayerNorm — the training-time tricks that actually work.",
          syllabusBullets: [
            "Weight decay recap",
            "Dropout as ensemble",
            "BatchNorm vs LayerNorm vs GroupNorm",
            "Early stopping, label smoothing",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "pytorch-fundamentals",
          title: "PyTorch fundamentals",
          description:
            "Tensors, autograd, nn.Module, DataLoader — the four ideas that unlock the framework.",
          syllabusBullets: [
            "Tensor creation and device movement",
            "autograd & requires_grad",
            "nn.Module composition",
            "DataLoader, Dataset, transforms",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "training-loop-anatomy",
          title: "Training-loop anatomy",
          description:
            "The 20-line loop every ML repo has — line by line.",
          syllabusBullets: [
            "Forward, loss, backward, step",
            "Gradient clipping",
            "Mixed-precision training",
            "Sane logging & checkpoints",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "3.2",
      slug: "cnn-rnn",
      title: "CNNs, RNNs & Their Limits",
      subtitle: "The architectures transformers replaced",
      topics: [
        {
          slug: "convolutions-intuition",
          title: "Convolutions — sliding windows of features",
          description:
            "From edge filters to feature detectors; parameter sharing as inductive bias.",
          syllabusBullets: [
            "Discrete 2D convolution definition",
            "Kernels, stride, padding",
            "Parameter sharing & translation invariance",
            "Pooling & receptive field",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "cnn-architectures",
          title: "CNN architectures (LeNet → ResNet)",
          description:
            "The decade that gave us skip connections; what generalizes.",
          syllabusBullets: [
            "LeNet, AlexNet, VGG",
            "Inception & 1×1 convs",
            "ResNet & residual learning",
            "EfficientNet-scale trade-offs",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "transfer-learning-vision",
          title: "Transfer learning in vision",
          description:
            "Frozen backbones, head fine-tuning, and small-data survival.",
          syllabusBullets: [
            "Pretrained weights on ImageNet",
            "Feature extraction vs fine-tuning",
            "Progressive unfreezing",
            "When transfer fails",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "rnn-lstm-gru",
          title: "RNNs, LSTM & GRU",
          description:
            "Sequences before transformers — the ideas that made attention necessary.",
          syllabusBullets: [
            "Vanilla RNN cell & unrolling",
            "Vanishing/exploding gradient in sequences",
            "LSTM & GRU gating",
            "Encoder–decoder with attention",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "sequence-limits",
          title: "The limits that demanded transformers",
          description:
            "Why the recurrent bottleneck couldn't scale — the frame for Tier IV.",
          syllabusBullets: [
            "Sequential compute constraint",
            "Long-range dependencies",
            "Memory in a fixed hidden state",
            "The transformer's contract with the future",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "regularization-augmentation",
          title: "Data augmentation & modern regularization",
          description:
            "Mixup, CutMix, RandAugment — modern training tricks.",
          syllabusBullets: [
            "Standard vision augmentation",
            "Mixup, CutMix, RandAugment, TrivialAugment",
            "Test-time augmentation",
            "When augmentation hurts",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "project-pytorch-vision-sequence",
          title: "Project · CNN + RNN from scratch",
          description:
            "Volume-III artifact: two models trained end-to-end in PyTorch.",
          syllabusBullets: [
            "CNN on CIFAR-10 baseline",
            "Transfer learning fine-tune",
            "LSTM on a small sequence task",
            "Evaluation & write-up",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// TIER 4 · Generative AI — 5 phases · 28 topics
// -----------------------------------------------------------------------------
const tier4: Tier = {
  id: 4,
  numeral: "IV",
  slug: "generative-ai",
  title: "Generative AI",
  subtitle: "NLP → Transformers → LLMs",
  duration: "8–10 weeks",
  landing:
    "The core destination. Attention, tokenization, RAG, agents. Everything the last three volumes built toward.",
  blurb:
    "The reason we started. Classical NLP is short. Transformers are long. Then LLMs: prompting, fine-tuning, RAG, agents. Every idea grounded in a runnable example and connected to how production systems actually ship.",
  phases: [
    {
      id: "4.1",
      slug: "classical-nlp",
      title: "Classical NLP",
      subtitle: "The pre-transformer world (briefly)",
      topics: [
        {
          slug: "text-preprocessing",
          title: "Tokenization & text preprocessing (pre-BPE)",
          description:
            "Words → tokens → integers; where classical pipelines began.",
          syllabusBullets: [
            "Whitespace, rule-based tokenizers",
            "Stemming vs lemmatization",
            "Stopwords: myths and cost",
            "Casing and normalization",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "bag-of-words-tfidf",
          title: "Bag-of-words & TF-IDF",
          description:
            "Sparse vectors that ruled retrieval for two decades.",
          syllabusBullets: [
            "Count vectors and n-grams",
            "TF-IDF formula & intuition",
            "Cosine similarity in TF-IDF space",
            "Where BM25 improves on TF-IDF",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "word-embeddings",
          title: "Word embeddings (Word2Vec, GloVe, FastText)",
          description:
            "Dense meaning vectors — the ancestor of every modern representation.",
          syllabusBullets: [
            "Word2Vec (skip-gram, CBOW)",
            "Negative sampling",
            "GloVe as co-occurrence factorization",
            "FastText for subwords",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "sequence-labeling-classical",
          title: "Sequence labeling: HMMs, CRFs",
          description:
            "POS-tagging and NER before neural nets — a short but honest tour.",
          syllabusBullets: [
            "HMM basics",
            "Linear-chain CRFs",
            "Viterbi algorithm",
            "When to still reach for these",
          ],
          priority: "optional",
          status: "outline",
        },
      ],
    },
    {
      id: "4.2",
      slug: "transformers",
      title: "Transformers From First Principles",
      subtitle: "The architecture that ate the world",
      topics: [
        {
          slug: "attention-intuition",
          title: "Attention — the intuition first",
          description:
            "Why we invented attention, in plain English, before any equations.",
          syllabusBullets: [
            "Content-based lookup as the goal",
            "Query / key / value roles",
            "Soft vs hard attention",
            "Bahdanau attention (RNN era) as a warm-up",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "self-attention",
          title: "Self-attention & scaled dot-product",
          description:
            "The heart of the transformer — derived line by line.",
          syllabusBullets: [
            "Q,K,V as learned projections",
            "Scaled dot-product formula",
            "Softmax normalization",
            "Masking (causal & padding)",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "multi-head-attention",
          title: "Multi-head attention",
          description:
            "Multiple attention 'lenses' in parallel — cheaper than it looks.",
          syllabusBullets: [
            "Head splitting mechanics",
            "Why multiple heads (empirically)",
            "Head concatenation & output projection",
            "MHA variations: MQA, GQA",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "positional-encodings",
          title: "Positional encodings",
          description:
            "How a transformer learns where tokens are — from sines to RoPE.",
          syllabusBullets: [
            "Absolute sinusoidal encoding",
            "Learned positional embeddings",
            "Rotary position embeddings (RoPE)",
            "ALiBi and long-context tricks",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "transformer-block",
          title: "The transformer block, top to bottom",
          description:
            "MHA → residual → norm → MLP → residual → norm; every wire mapped.",
          syllabusBullets: [
            "Pre-norm vs post-norm",
            "FFN expansion factor",
            "Residual pathways",
            "Full encoder & decoder blocks",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "tokenization-bpe",
          title: "Modern tokenization (BPE, WordPiece, Unigram, SentencePiece)",
          description:
            "The subword tokenizers powering every modern LLM.",
          syllabusBullets: [
            "BPE algorithm derivation",
            "WordPiece & Unigram differences",
            "SentencePiece practical usage",
            "Vocabulary size trade-offs",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "encoder-decoder-vs-decoder-only",
          title: "Encoder, decoder & encoder–decoder families",
          description:
            "BERT vs GPT vs T5 — architectures and their sweet spots.",
          syllabusBullets: [
            "Encoder-only (BERT-style) for understanding",
            "Decoder-only (GPT-style) for generation",
            "Encoder-decoder (T5) for seq-to-seq",
            "Modern convergence toward decoder-only",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "attention-efficient",
          title: "Efficient attention (Flash, sliding, sparse)",
          description:
            "How to go from O(n²) to something a GPU actually likes.",
          syllabusBullets: [
            "Memory-bound nature of attention",
            "FlashAttention (I → III)",
            "Sliding-window & local attention",
            "Sparse attention patterns",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "4.3",
      slug: "llms",
      title: "Large Language Models",
      subtitle: "Training, evaluation, deployment",
      topics: [
        {
          slug: "pretraining-objectives",
          title: "Pre-training objectives",
          description:
            "Next-token vs masked vs prefix — what each teaches the model.",
          syllabusBullets: [
            "Causal (next-token) language modeling",
            "Masked (BERT) objective",
            "Prefix LM & span corruption (T5)",
            "Objective choice → downstream personality",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "scaling-laws",
          title: "Scaling laws",
          description:
            "Kaplan → Chinchilla → modern — the log-linear love story of compute, data, params.",
          syllabusBullets: [
            "Kaplan et al. scaling laws",
            "Chinchilla-optimal training",
            "Data quality vs quantity",
            "Test-time compute scaling",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "instruction-tuning-rlhf",
          title: "Instruction tuning & RLHF",
          description:
            "The alignment sandwich that turned models into assistants.",
          syllabusBullets: [
            "Supervised instruction fine-tuning",
            "Reward modeling",
            "PPO for RLHF (intuition)",
            "DPO & direct preference alternatives",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "sampling-decoding",
          title: "Sampling & decoding strategies",
          description:
            "Greedy, beam, top-k, top-p, temperature — how a model's voice is tuned.",
          syllabusBullets: [
            "Greedy & beam search",
            "Top-k & nucleus (top-p)",
            "Temperature and its coupling",
            "Speculative & constrained decoding",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "prompt-engineering",
          title: "Prompt engineering — patterns and anti-patterns",
          description:
            "Not folk magic; a repeatable set of moves.",
          syllabusBullets: [
            "Zero-shot, few-shot, chain-of-thought",
            "System prompts and role framing",
            "Structured output (JSON, schemas)",
            "Guardrails against injection",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "parameter-efficient-finetuning",
          title: "PEFT: LoRA, QLoRA, adapters",
          description:
            "Fine-tuning a 70B model on your laptop — how it actually works.",
          syllabusBullets: [
            "Full fine-tuning cost",
            "LoRA math (low-rank updates)",
            "QLoRA quantization trick",
            "Adapter families comparison",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "quantization-inference",
          title: "Quantization & inference optimization",
          description:
            "int8, int4, and every runtime trick that squeezes a model onto a phone.",
          syllabusBullets: [
            "int8/int4 post-training quantization",
            "GPTQ, AWQ, bitsandbytes",
            "KV-cache tricks",
            "vLLM, TGI, TensorRT-LLM",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "4.4",
      slug: "rag",
      title: "Retrieval-Augmented Generation",
      subtitle: "Giving an LLM a memory it can trust",
      topics: [
        {
          slug: "rag-anatomy",
          title: "RAG anatomy",
          description:
            "The retrieval + generation loop — piece by piece.",
          syllabusBullets: [
            "Ingest → embed → store → retrieve → generate",
            "Chunk sizing & overlap",
            "Prompt construction with context",
            "When RAG helps, when it hurts",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "embeddings-retrieval",
          title: "Text embeddings & semantic search",
          description:
            "The vectors that make retrieval semantic.",
          syllabusBullets: [
            "Encoder models for embeddings",
            "Cosine vs dot product in retrieval",
            "Sentence, passage, doc granularity",
            "Cross-encoder rerankers",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "vector-databases",
          title: "Vector databases (FAISS, HNSW, pgvector)",
          description:
            "Approximate nearest neighbor at millions of vectors.",
          syllabusBullets: [
            "Exact vs approximate NN trade-offs",
            "HNSW algorithm intuition",
            "IVF, PQ, and product quantization",
            "pgvector, FAISS, Qdrant, Weaviate, Pinecone",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "hybrid-retrieval",
          title: "Hybrid retrieval & reranking",
          description:
            "BM25 + dense + rerank — the recipe that actually beats dense-only.",
          syllabusBullets: [
            "Sparse (BM25) + dense fusion",
            "Reciprocal rank fusion",
            "Cross-encoder reranker step",
            "Practical evaluation",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "rag-evaluation",
          title: "Evaluating RAG systems",
          description:
            "Retrieval hit-rate vs answer quality; RAGAS and beyond.",
          syllabusBullets: [
            "Retrieval metrics (Recall@k, MRR, nDCG)",
            "Answer quality (faithfulness, groundedness)",
            "LLM-as-judge caveats",
            "End-to-end vs component evaluation",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
    {
      id: "4.5",
      slug: "agents",
      title: "Agents & Tool Use",
      subtitle: "LLMs that act",
      topics: [
        {
          slug: "tool-use-function-calling",
          title: "Tool use & function calling",
          description:
            "How to give an LLM safe hands.",
          syllabusBullets: [
            "Function calling contracts",
            "Schema design & validation",
            "Argument coercion pitfalls",
            "Structured-output as a design language",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "agent-patterns",
          title: "Agent patterns: ReAct, plan-and-execute, DAG",
          description:
            "The archetypal loops that keep showing up.",
          syllabusBullets: [
            "ReAct: reason + act",
            "Plan-and-execute",
            "Router / DAG agents",
            "Multi-agent choreography",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "memory-and-state",
          title: "Agent memory & state",
          description:
            "Short-term, long-term, episodic — what the agent remembers between calls.",
          syllabusBullets: [
            "Conversation memory patterns",
            "Vector memory for episodes",
            "Structured memory (knowledge graphs)",
            "Memory hygiene at scale",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "code-agents",
          title: "Code agents & code execution",
          description:
            "When the tool is a Python sandbox — the modern coding assistant.",
          syllabusBullets: [
            "Sandboxed execution (E2B, Docker)",
            "Code-writing prompting patterns",
            "Iteration on errors",
            "Cost containment",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "project-tiny-gpt-and-agent-rag",
          title: "Project · Tiny GPT + production RAG agent",
          description:
            "Volume-IV artifact: a nano-GPT trained from scratch AND a full RAG agent.",
          syllabusBullets: [
            "Tiny GPT trained on toy corpus",
            "Full RAG stack (embed, store, retrieve, rerank)",
            "Agent loop with tool calls",
            "Deployment prep",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// TIER 5 · Engineering & Production — 5 phases · 18 topics
// -----------------------------------------------------------------------------
const tier5: Tier = {
  id: 5,
  numeral: "V",
  slug: "production",
  title: "Engineering & Production",
  subtitle: "Evaluation · MLOps · Safety",
  duration: "3–4 weeks",
  landing:
    "The under-taught, most-hireable half. Turn model-tinkering into systems that ship.",
  blurb:
    "The half of the field textbooks skip. Evaluation as a discipline; MLOps; observability; cost; safety and red-teaming; the interface between models and the humans who use them.",
  phases: [
    {
      id: "5.1",
      slug: "evaluation",
      title: "Evaluation as a Discipline",
      subtitle: "The benchmarks you can defend",
      topics: [
        {
          slug: "eval-design",
          title: "Designing an evaluation harness",
          description:
            "From vibes-based checks to a suite you can trust.",
          syllabusBullets: [
            "Task decomposition into evaluable pieces",
            "Golden datasets & labeling",
            "Regression testing for prompts",
            "Statistical significance",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "llm-as-judge",
          title: "LLM-as-judge — pros, cons, calibration",
          description:
            "The seductive shortcut, and how not to lie to yourself.",
          syllabusBullets: [
            "Judge prompt design",
            "Position bias, verbosity bias",
            "Pairwise vs pointwise",
            "Cross-judge calibration",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "benchmarks-and-leaderboards",
          title: "Public benchmarks — reading, using, not trusting",
          description:
            "MMLU, HELM, MT-Bench, Arena — what each measures.",
          syllabusBullets: [
            "Benchmark contamination",
            "Task-relevance filtering",
            "Reading a leaderboard skeptically",
            "Building a proprietary eval",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "5.2",
      slug: "mlops",
      title: "MLOps Essentials",
      subtitle: "Systems for repeatable ML",
      topics: [
        {
          slug: "experiment-tracking",
          title: "Experiment tracking & reproducibility",
          description:
            "The lab notebook you'll actually keep — MLflow, W&B, plain files.",
          syllabusBullets: [
            "What to log (and what not)",
            "Config-as-code vs UI",
            "Seed & dependency pinning",
            "Reproducibility floor",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "data-versioning",
          title: "Data versioning & lineage",
          description:
            "DVC, LakeFS, Delta — versioning data like code.",
          syllabusBullets: [
            "Why git isn't enough",
            "Content-addressable data",
            "Lineage & provenance",
            "Practical DVC workflow",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "containerization-and-deploy",
          title: "Containerization & model deployment",
          description:
            "Docker + serverless + real GPU boxes — the deployment ladder.",
          syllabusBullets: [
            "Dockerfile patterns for ML",
            "Serverless (Modal, Replicate)",
            "GPU on Kubernetes",
            "Inference server frameworks",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "ci-cd-for-ml",
          title: "CI/CD for ML systems",
          description:
            "Tests that catch prompt regressions and data drift before your users do.",
          syllabusBullets: [
            "Unit / integration / eval in CI",
            "Canary & shadow deployments",
            "Prompt regression tests",
            "Rollback strategies",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "5.3",
      slug: "observability-cost",
      title: "Observability & Cost",
      subtitle: "Latency · tokens · dollars",
      topics: [
        {
          slug: "llm-observability",
          title: "LLM observability (traces, logs, spans)",
          description:
            "OpenTelemetry for language models — see every prompt, every retry.",
          syllabusBullets: [
            "Trace / span vocabulary",
            "LangSmith, Traceloop, OpenTelemetry-LLM",
            "PII scrubbing",
            "Alerting on quality drift",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "latency-cost-tradeoffs",
          title: "Latency & cost trade-offs",
          description:
            "Token budgets, streaming, model selection — the levers that matter.",
          syllabusBullets: [
            "Time-to-first-token vs total time",
            "Streaming & partial responses",
            "Model routing by task",
            "Cache & memoize aggressively",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "drift-detection",
          title: "Data & concept drift detection",
          description:
            "When the world changes under your model — and how to notice.",
          syllabusBullets: [
            "Population Stability Index",
            "Feature drift vs concept drift",
            "Streaming drift detectors",
            "Retraining triggers",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "5.4",
      slug: "safety-security",
      title: "Safety, Security & Red-Teaming",
      subtitle: "Adversaries and guardrails",
      topics: [
        {
          slug: "prompt-injection",
          title: "Prompt injection & jailbreaks",
          description:
            "Attacks that arrive through the very inputs your product needs.",
          syllabusBullets: [
            "Direct vs indirect injection",
            "Data-exfiltration patterns",
            "Defensive prompting limits",
            "Structural mitigations",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "content-safety",
          title: "Content safety & moderation",
          description:
            "Filters, policies, and the human-in-the-loop.",
          syllabusBullets: [
            "Classifier-based filters",
            "Policy design",
            "Escalation paths",
            "Locale sensitivity",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "red-teaming",
          title: "Red-teaming methodology",
          description:
            "How to actually attack your own system — repeatably.",
          syllabusBullets: [
            "Threat modeling",
            "Automated red-teaming",
            "Human vs synthetic adversaries",
            "Reporting & tracking",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "5.5",
      slug: "ux-and-humans",
      title: "Human-Facing Systems",
      subtitle: "Where the model meets the user",
      topics: [
        {
          slug: "ai-ux-patterns",
          title: "AI UX patterns — streaming, cites, confidence",
          description:
            "Interface design that respects the model's uncertainty.",
          syllabusBullets: [
            "Streaming responses",
            "Cite-and-quote patterns",
            "Confidence disclosure",
            "Undo & regeneration flows",
          ],
          priority: "core",
          status: "outline",
        },
        {
          slug: "human-in-the-loop",
          title: "Human-in-the-loop pipelines",
          description:
            "Where humans belong in the loop, and how to keep them productive.",
          syllabusBullets: [
            "Sampling strategies for review",
            "Active learning revisited",
            "Feedback capture UI",
            "Escalation policies",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "project-deploy-monitored-rag",
          title: "Project · Deployed, monitored, cost-aware RAG",
          description:
            "Volume-V artifact: take the Vol IV RAG and productionize it.",
          syllabusBullets: [
            "Container + inference server",
            "Observability & alerting",
            "Cost dashboards",
            "Rollback and canary",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// TIER 6 · Depth — 3 phases · 8 topics
// -----------------------------------------------------------------------------
const tier6: Tier = {
  id: 6,
  numeral: "VI",
  slug: "depth",
  title: "Depth",
  subtitle: "Situational & Research",
  duration: "ongoing",
  landing:
    "A menu, not a checklist. Visited when a project demands.",
  blurb:
    "The tier that stays open. Diffusion for image models, mixture-of-experts, mechanistic interpretability, distributed training, multimodal — chapters read when the project you're working on requires them.",
  phases: [
    {
      id: "6.1",
      slug: "generative-modalities",
      title: "Diffusion & Beyond",
      subtitle: "Non-text generation",
      topics: [
        {
          slug: "diffusion-fundamentals",
          title: "Diffusion models — the forward/reverse chain",
          description:
            "DDPMs from first principles; the loss that surprises you.",
          syllabusBullets: [
            "Forward noising process",
            "Score matching intuition",
            "Reverse sampling",
            "Classifier-free guidance",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "diffusion-in-practice",
          title: "Stable Diffusion & control (LoRA, ControlNet)",
          description:
            "Latent diffusion, textual inversion, and how images get controllable.",
          syllabusBullets: [
            "Latent diffusion architecture",
            "LoRA & DreamBooth style fine-tuning",
            "ControlNet & IP-Adapter",
            "Prompting quirks",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "multimodal-vlms",
          title: "Multimodal / VLM architectures",
          description:
            "CLIP → LLaVA → GPT-4o — how vision meets language.",
          syllabusBullets: [
            "CLIP contrastive pretraining",
            "Visual instruction tuning",
            "Modern VLM architectures",
            "Evaluation for multimodal",
          ],
          priority: "mandatory",
          status: "outline",
        },
      ],
    },
    {
      id: "6.2",
      slug: "architecture-research",
      title: "Architecture Research",
      subtitle: "Where the frontier moves",
      topics: [
        {
          slug: "moe-and-routing",
          title: "Mixture-of-Experts",
          description:
            "Sparsity that makes larger models cheaper to train.",
          syllabusBullets: [
            "Gating & routing",
            "Load balancing losses",
            "Modern MoE architectures",
            "Inference-time challenges",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "state-space-models",
          title: "State-space models (Mamba, RWKV)",
          description:
            "The recurrent renaissance; linear-time long context.",
          syllabusBullets: [
            "Linear RNN revival",
            "S4 / Mamba selectivity",
            "Comparisons vs transformers",
            "Hybrid architectures",
          ],
          priority: "optional",
          status: "outline",
        },
        {
          slug: "mechanistic-interpretability",
          title: "Mechanistic interpretability",
          description:
            "Circuits, features, and the effort to actually understand a network.",
          syllabusBullets: [
            "Circuits & features",
            "Sparse autoencoders",
            "Attention head analysis",
            "Ethical frontier questions",
          ],
          priority: "optional",
          status: "outline",
        },
      ],
    },
    {
      id: "6.3",
      slug: "systems-at-scale",
      title: "Systems at Scale",
      subtitle: "Training and serving at the frontier",
      topics: [
        {
          slug: "distributed-training",
          title: "Distributed training (DP, TP, PP, FSDP)",
          description:
            "Data, tensor, pipeline, and sharded parallelism.",
          syllabusBullets: [
            "Data parallel vs tensor parallel",
            "Pipeline parallel & bubbles",
            "FSDP / ZeRO",
            "Communication cost model",
          ],
          priority: "mandatory",
          status: "outline",
        },
        {
          slug: "reproduce-a-paper",
          title: "Project · Reproduce a paper",
          description:
            "Volume-VI artifact: pick a paper, reimplement it, ship the write-up.",
          syllabusBullets: [
            "Choosing a tractable paper",
            "Reading and mining the appendix",
            "Reproducing on limited hardware",
            "Write-up template",
          ],
          priority: "core",
          status: "outline",
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Compose
// -----------------------------------------------------------------------------
export const CURRICULUM: Tier[] = [tier0, tier1, tier2, tier3, tier4, tier5, tier6];

export const TIER_BY_ID = new Map(CURRICULUM.map((t) => [t.id, t]));
export const TIER_BY_SLUG = new Map(CURRICULUM.map((t) => [t.slug, t]));

export type TopicPath = {
  tier: Tier;
  phase: Phase;
  topic: Topic;
  filePath: string;
  urlSlugParts: string[];
};

export function allTopicPaths(): TopicPath[] {
  const out: TopicPath[] = [];
  for (const tier of CURRICULUM) {
    for (const phase of tier.phases) {
      for (const topic of phase.topics) {
        out.push({
          tier,
          phase,
          topic,
          filePath: `tier-${tier.id}/phase-${phase.id.replace(".", "-")}/${topic.slug}.mdx`,
          urlSlugParts: [tier.slug, phase.slug, topic.slug],
        });
      }
    }
  }
  return out;
}

export function findTopicByUrlParts(parts: string[]): TopicPath | undefined {
  return allTopicPaths().find(
    (tp) =>
      tp.urlSlugParts[0] === parts[0] &&
      tp.urlSlugParts[1] === parts[1] &&
      tp.urlSlugParts[2] === parts[2],
  );
}

export function tierCounts(tier: Tier) {
  const topics = tier.phases.flatMap((p) => p.topics);
  return {
    topics: topics.length,
    written: topics.filter((t) => t.status === "written").length,
    phases: tier.phases.length,
  };
}

export function totals() {
  const topics = CURRICULUM.flatMap((t) => t.phases.flatMap((p) => p.topics));
  return {
    topics: topics.length,
    written: topics.filter((t) => t.status === "written").length,
    tiers: CURRICULUM.length,
    phases: CURRICULUM.reduce((s, t) => s + t.phases.length, 0),
  };
}

export function neighbors(current: TopicPath): { prev?: TopicPath; next?: TopicPath } {
  const all = allTopicPaths();
  const idx = all.findIndex(
    (tp) =>
      tp.urlSlugParts[0] === current.urlSlugParts[0] &&
      tp.urlSlugParts[1] === current.urlSlugParts[1] &&
      tp.urlSlugParts[2] === current.urlSlugParts[2],
  );
  if (idx < 0) return {};
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}
