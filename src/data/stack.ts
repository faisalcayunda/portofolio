export type Tech = { name: string; icon: string; color: string };
export type StackCat = { label: string; items: Tech[] };
export const stack: StackCat[] = [
  {
    "label": "Languages",
    "items": [
      {
        "name": "Go",
        "icon": "/tech/go.svg",
        "color": "#00ADD8"
      },
      {
        "name": "Python",
        "icon": "/tech/python.svg",
        "color": "#3776AB"
      },
      {
        "name": "Java",
        "icon": "/tech/openjdk.svg",
        "color": "#9aa0ac"
      },
      {
        "name": "PHP",
        "icon": "/tech/php.svg",
        "color": "#777BB4"
      },
      {
        "name": "JavaScript",
        "icon": "/tech/javascript.svg",
        "color": "#F7DF1E"
      },
      {
        "name": "TypeScript",
        "icon": "/tech/typescript.svg",
        "color": "#3178C6"
      }
    ]
  },
  {
    "label": "Databases & data",
    "items": [
      {
        "name": "PostgreSQL",
        "icon": "/tech/postgresql.svg",
        "color": "#4169E1"
      },
      {
        "name": "MySQL",
        "icon": "/tech/mysql.svg",
        "color": "#4479A1"
      },
      {
        "name": "MongoDB",
        "icon": "/tech/mongodb.svg",
        "color": "#47A248"
      },
      {
        "name": "Redis",
        "icon": "/tech/redis.svg",
        "color": "#FF4438"
      },
      {
        "name": "Trino",
        "icon": "/tech/trino.svg",
        "color": "#9aa0ac"
      },
      {
        "name": "Airflow",
        "icon": "/tech/apacheairflow.svg",
        "color": "#017CEE"
      },
      {
        "name": "Spark",
        "icon": "/tech/apachespark.svg",
        "color": "#E25A1C"
      }
    ]
  },
  {
    "label": "APIs & frameworks",
    "items": [
      {
        "name": "chi",
        "icon": "/tech/chi.svg",
        "color": "#01933F"
      },
      {
        "name": "Echo",
        "icon": "/tech/echo.svg",
        "color": "#EEEEE1"
      },
      {
        "name": "FastAPI",
        "icon": "/tech/fastapi.svg",
        "color": "#009688"
      },
      {
        "name": "Flask",
        "icon": "/tech/flask.svg",
        "color": "#3BABC3"
      },
      {
        "name": "Django",
        "icon": "/tech/django.svg",
        "color": "#9aa0ac"
      },
      {
        "name": "Spring",
        "icon": "/tech/spring.svg",
        "color": "#6DB33F"
      },
      {
        "name": "Laravel",
        "icon": "/tech/laravel.svg",
        "color": "#FF2D20"
      },
      {
        "name": "Node.js",
        "icon": "/tech/nodedotjs.svg",
        "color": "#5FA04E"
      },
      {
        "name": "Express",
        "icon": "/tech/express.svg",
        "color": "#9aa0ac"
      },
      {
        "name": "React",
        "icon": "/tech/react.svg",
        "color": "#61DAFB"
      }
    ]
  },
  {
    "label": "DevOps & infra",
    "items": [
      {
        "name": "Docker",
        "icon": "/tech/docker.svg",
        "color": "#2496ED"
      },
      {
        "name": "Kubernetes",
        "icon": "/tech/kubernetes.svg",
        "color": "#326CE5"
      },
      {
        "name": "GitHub Actions",
        "icon": "/tech/githubactions.svg",
        "color": "#2088FF"
      },
      {
        "name": "Nginx",
        "icon": "/tech/nginx.svg",
        "color": "#009639"
      },
      {
        "name": "Terraform",
        "icon": "/tech/terraform.svg",
        "color": "#844FBA"
      },
      {
        "name": "Ubuntu",
        "icon": "/tech/ubuntu.svg",
        "color": "#E95420"
      },
      {
        "name": "Git",
        "icon": "/tech/git.svg",
        "color": "#F03C2E"
      }
    ]
  }
];
