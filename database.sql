-- users テーブル

sqlCREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  gender ENUM('male', 'female') NOT NULL,
  location VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- couples テーブル

sqlCREATE TABLE couples (
  id SERIAL PRIMARY KEY,
  male_user_id INTEGER REFERENCES users(id),
  female_user_id INTEGER REFERENCES users(id),
  start_date DATE NOT NULL,
  current_day INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- questions テーブル

sqlCREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  question_type ENUM('manual', 'ai_generated') NOT NULL,
  category VARCHAR(100),
  manual_order INTEGER, -- マニュアル質問の順番
  ai_context TEXT, -- AI生成時の文脈情報
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- responses テーブル

sqlCREATE TABLE responses (
  id SERIAL PRIMARY KEY,
  couple_id INTEGER REFERENCES couples(id),
  question_id INTEGER REFERENCES questions(id),
  user_id INTEGER REFERENCES users(id),
  answer TEXT NOT NULL,
  comment TEXT,
  response_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(couple_id, question_id, user_id)
);